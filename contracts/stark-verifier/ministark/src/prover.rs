use crate::channel::ProverChannel;
use crate::composer::ConstraintComposer;
use crate::composer::DeepPolyComposer;
use crate::fri::FriProver;
use crate::trace::Queries;
use crate::Air;
use crate::Proof;
use crate::ProofOptions;
use crate::StarkExtensionOf;
use crate::Trace;
use ark_ff::PrimeField;
use gpu_poly::GpuFftField;
use sha2::Sha256;

/// Errors that can occur during the proving stage
#[derive(Debug)]
pub enum ProvingError {
    Fail,
    // TODO
}

pub trait Prover {
    type Fp: GpuFftField + PrimeField;
    type Fq: StarkExtensionOf<Self::Fp>;
    type Air: Air<Fp = Self::Fp, Fq = Self::Fq>;
    type Trace: Trace<Fp = Self::Fp, Fq = Self::Fq>;

    fn new(options: ProofOptions) -> Self;

    fn get_pub_inputs(&self, trace: &Self::Trace) -> <Self::Air as Air>::PublicInputs;

    fn options(&self) -> ProofOptions;

    async fn generate_proof(&self, trace: Self::Trace) -> Result<Proof<Self::Air>, ProvingError> {
        let options = self.options();
        let trace_info = trace.info();
        let pub_inputs = self.get_pub_inputs(&trace);
        let air = Self::Air::new(trace_info, pub_inputs, options);
        air.validate();
        let mut channel = ProverChannel::<Self::Air, Sha256>::new(&air);

        let trace_xs = air.trace_domain();
        let lde_xs = air.lde_domain();
        let base_trace = trace.base_columns();
        let base_trace_polys = base_trace.interpolate(trace_xs);
        assert_eq!(Self::Trace::NUM_BASE_COLUMNS, base_trace_polys.num_cols());
        let base_trace_lde = base_trace_polys.evaluate(lde_xs);
        let base_trace_lde_tree = base_trace_lde.commit_to_rows();
        channel.commit_base_trace(base_trace_lde_tree.root());
        let challenges = air.get_challenges(&mut channel.public_coin);
        let hints = air.get_hints(&challenges);

        let extension_trace = trace.build_extension_columns(&challenges);
        let num_extension_columns = extension_trace.as_ref().map_or(0, |t| t.num_cols());
        assert_eq!(Self::Trace::NUM_EXTENSION_COLUMNS, num_extension_columns);
        let extension_trace_polys = extension_trace.as_ref().map(|t| t.interpolate(trace_xs));
        let extension_trace_lde = extension_trace_polys.as_ref().map(|p| p.evaluate(lde_xs));
        let extension_trace_tree = extension_trace_lde.as_ref().map(|lde| lde.commit_to_rows());
        if let Some(t) = extension_trace_tree.as_ref() {
            channel.commit_extension_trace(t.root())
        }

        #[cfg(all(feature = "std", debug_assertions))]
        air.validate_constraints(&challenges, &hints, base_trace, extension_trace.as_ref());
        drop((base_trace, extension_trace));

        let composition_coeffs = air.get_constraint_composition_coeffs(&mut channel.public_coin);
        let constraint_coposer = ConstraintComposer::new(&air, composition_coeffs);
        // TODO: move commitment here
        // NOTE: consuming LDEs here requires more compute later but saves on memory
        let (composition_trace_lde, composition_trace_polys, composition_trace_lde_tree) =
            constraint_coposer.build_commitment(
                &challenges,
                &hints,
                base_trace_lde,
                extension_trace_lde,
            );
        channel.commit_composition_trace(composition_trace_lde_tree.root());

        let mut deep_poly_composer = DeepPolyComposer::new(
            &air,
            channel.get_ood_point(),
            &base_trace_polys,
            extension_trace_polys.as_ref(),
            composition_trace_polys,
        );
        let (execution_trace_oods, composition_trace_oods) = deep_poly_composer.get_ood_evals();
        channel.send_execution_trace_ood_evals(execution_trace_oods);
        channel.send_composition_trace_ood_evals(composition_trace_oods);
        let deep_coeffs = air.get_deep_composition_coeffs(&mut channel.public_coin);
        let deep_composition_poly = deep_poly_composer.into_deep_poly(deep_coeffs);
        let deep_composition_lde = deep_composition_poly.into_evaluations(lde_xs);

        let mut fri_prover = FriProver::<Self::Fq, Sha256>::new(air.options().into_fri_options());
        #[cfg(feature = "std")]
        let now = std::time::Instant::now();
        fri_prover.build_layers(&mut channel, deep_composition_lde.try_into().unwrap());
        #[cfg(feature = "std")]
        println!("yo {:?}", now.elapsed());

        channel.grind_fri_commitments();

        let query_positions = channel.get_fri_query_positions();
        let fri_proof = fri_prover.into_proof(&query_positions);

        let queries = Queries::new(
            &air,
            &base_trace_polys,
            extension_trace_polys.as_ref(),
            &composition_trace_lde,
            base_trace_lde_tree,
            extension_trace_tree,
            composition_trace_lde_tree,
            &query_positions,
        );
        Ok(channel.build_proof(queries, fri_proof))
    }
}
