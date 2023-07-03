use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetResultResponse, InstantiateMsg, QueryMsg};
use crate::state::{State, STATE};
use base64::{engine::general_purpose::STANDARD, Engine};
use core::{convert::TryInto, marker::PhantomData, mem};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};
use miden_air::{ProcessorAir, PublicInputs, StarkField};
use miden_core::utils::{Deserializable, Serializable, SliceReader};
use miden_core::{utils::collections::Vec, ProgramOutputs};
use miden_verifier::{Digest, StarkProof, VerificationError};
use winter_air::proof::{Queries, Table};
use winter_air::EvaluationFrame;
use winter_crypto::{
    hashers::{Blake3_192, Blake3_256, Sha3_256},
    BatchMerkleProof, ElementHasher, MerkleTree, RandomCoin,
};
use winter_fri::{
    folding::fold_positions, utils::map_positions_to_indexes, FriOptions,
    VerifierChannel as FriVerifierChannel, VerifierError as FriVerifierError,
};
use winterfell::math::{
    fft,
    fields::{CubeExtension, QuadExtension},
    log2, polynom, FieldElement,
};
use winterfell::{
    Air, AuxTraceRandElements, ConstraintCompositionCoefficients, DeepCompositionCoefficients,
    FieldExtension, HashFunction, VerifierError,
};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let m = &msg.result.to_string();
    STATE.save(deps.storage, &State { result: msg.result })?;
    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("result", m))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Verify {
            hash,
            inputs,
            outputs,
            proof,
        } => execute::verify(deps, hash, inputs, outputs, proof),
    }
}

pub mod execute {
    use super::*;
    pub fn verify(
        deps: DepsMut,
        hash: Vec<u8>,
        inputs: Vec<u64>,
        outputs: Vec<Vec<u64>>,
        proof: String,
    ) -> Result<Response, ContractError> {
        // convert stack inputs to field elements
        let mut stack_input_felts = Vec::with_capacity(inputs.len());
        for &input in inputs.iter().rev() {
            stack_input_felts.push(
                input
                    .try_into()
                    .map_err(|_| VerificationError::InputNotFieldElement(input))
                    .unwrap(),
            );
        }
        // build public inputs and try to verify the proof
        let pub_inputs = PublicInputs::new(
            Digest::read_from(&mut SliceReader::new(&hash)).unwrap(),
            stack_input_felts,
            ProgramOutputs::new(outputs[0].clone(), outputs[1].clone()),
        );
        // run verification and update state with result
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            match verify_proof::<ProcessorAir>(
                StarkProof::from_bytes(&STANDARD.decode(&proof.as_bytes()).unwrap()).unwrap(),
                pub_inputs,
            )
            .map_err(VerificationError::VerifierError)
            {
                Ok(_) => {
                    let s = "ZKP successfully verified - execution confirmed!";
                    println!("\n{}", s);
                    state.result = s.to_string();
                }
                Err(msg) => {
                    println!("\n{}", msg);
                    state.result = msg.to_string();
                }
            }
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "verify"))
    }

    fn verify_proof<AIR: Air>(
        proof: StarkProof,
        pub_inputs: AIR::PublicInputs,
    ) -> Result<(), VerifierError> {
        // build a seed for the public coin; the initial seed is the hash of public inputs and proof
        // context, but as the protocol progresses, the coin will be reseeded with the info received
        // from the prover
        let mut public_coin_seed = Vec::new();
        pub_inputs.write_into(&mut public_coin_seed);
        proof.context.write_into(&mut public_coin_seed);

        // create AIR instance for the computation specified in the proof
        let air = AIR::new(proof.get_trace_info(), pub_inputs, proof.options().clone());

        // figure out which version of the generic proof verification procedure to run. this is a sort
        // of static dispatch for selecting two generic parameter: extension field and hash function.
        match air.options().field_extension() {
            FieldExtension::None => match air.options().hash_fn() {
                HashFunction::Blake3_256 => {
                    let public_coin = RandomCoin::new(&public_coin_seed);
                    let channel = VerifierChannel::new(&air, proof)?;
                    perform_verification::<AIR, AIR::BaseField, Blake3_256<AIR::BaseField>>(
                        air,
                        channel,
                        public_coin,
                    )
                }
                HashFunction::Blake3_192 => {
                    let public_coin = RandomCoin::new(&public_coin_seed);
                    let channel = VerifierChannel::new(&air, proof)?;
                    perform_verification::<AIR, AIR::BaseField, Blake3_192<AIR::BaseField>>(
                        air,
                        channel,
                        public_coin,
                    )
                }
                HashFunction::Sha3_256 => {
                    let public_coin = RandomCoin::new(&public_coin_seed);
                    let channel = VerifierChannel::new(&air, proof)?;
                    perform_verification::<AIR, AIR::BaseField, Sha3_256<AIR::BaseField>>(
                        air,
                        channel,
                        public_coin,
                    )
                }
            },
            FieldExtension::Quadratic => {
                if !<QuadExtension<AIR::BaseField>>::is_supported() {
                    return Err(VerifierError::UnsupportedFieldExtension(2));
                }
                match air.options().hash_fn() {
                    HashFunction::Blake3_256 => {
                        let public_coin = RandomCoin::new(&public_coin_seed);
                        let channel = VerifierChannel::new(&air, proof)?;
                        perform_verification::<
                            AIR,
                            QuadExtension<AIR::BaseField>,
                            Blake3_256<AIR::BaseField>,
                        >(air, channel, public_coin)
                    }
                    HashFunction::Blake3_192 => {
                        let public_coin = RandomCoin::new(&public_coin_seed);
                        let channel = VerifierChannel::new(&air, proof)?;
                        perform_verification::<
                            AIR,
                            QuadExtension<AIR::BaseField>,
                            Blake3_192<AIR::BaseField>,
                        >(air, channel, public_coin)
                    }
                    HashFunction::Sha3_256 => {
                        let public_coin = RandomCoin::new(&public_coin_seed);
                        let channel = VerifierChannel::new(&air, proof)?;
                        perform_verification::<
                            AIR,
                            QuadExtension<AIR::BaseField>,
                            Sha3_256<AIR::BaseField>,
                        >(air, channel, public_coin)
                    }
                }
            }
            FieldExtension::Cubic => {
                if !<CubeExtension<AIR::BaseField>>::is_supported() {
                    return Err(VerifierError::UnsupportedFieldExtension(3));
                }
                match air.options().hash_fn() {
                    HashFunction::Blake3_256 => {
                        let public_coin = RandomCoin::new(&public_coin_seed);
                        let channel = VerifierChannel::new(&air, proof)?;
                        perform_verification::<
                            AIR,
                            CubeExtension<AIR::BaseField>,
                            Blake3_256<AIR::BaseField>,
                        >(air, channel, public_coin)
                    }
                    HashFunction::Blake3_192 => {
                        let public_coin = RandomCoin::new(&public_coin_seed);
                        let channel = VerifierChannel::new(&air, proof)?;
                        perform_verification::<
                            AIR,
                            CubeExtension<AIR::BaseField>,
                            Blake3_192<AIR::BaseField>,
                        >(air, channel, public_coin)
                    }
                    HashFunction::Sha3_256 => {
                        let public_coin = RandomCoin::new(&public_coin_seed);
                        let channel = VerifierChannel::new(&air, proof)?;
                        perform_verification::<
                            AIR,
                            CubeExtension<AIR::BaseField>,
                            Sha3_256<AIR::BaseField>,
                        >(air, channel, public_coin)
                    }
                }
            }
        }
    }

    // VERIFICATION PROCEDURE
    // ================================================================================================
    /// Performs the actual verification by reading the data from the `channel` and making sure it
    /// attests to a correct execution of the computation specified by the provided `air`.
    fn perform_verification<A, E, H>(
        air: A,
        mut channel: VerifierChannel<E, H>,
        mut public_coin: RandomCoin<A::BaseField, H>,
    ) -> Result<(), VerifierError>
    where
        A: Air,
        E: FieldElement<BaseField = A::BaseField>,
        H: ElementHasher<BaseField = A::BaseField>,
    {
        // 1 ----- trace commitment -------------------------------------------------------------------
        // Read the commitments to evaluations of the trace polynomials over the LDE domain sent by the
        // prover. The commitments are used to update the public coin, and draw sets of random elements
        // from the coin (in the interactive version of the protocol the verifier sends these random
        // elements to the prover after each commitment is made). When there are multiple trace
        // commitments (i.e., the trace consists of more than one segment), each previous commitment is
        // used to draw random elements needed to construct the next trace segment. The last trace
        // commitment is used to draw a set of random coefficients which the prover uses to compute
        // constraint composition polynomial.
        let trace_commitments = channel.read_trace_commitments();

        // reseed the coin with the commitment to the main trace segment
        public_coin.reseed(trace_commitments[0]);

        // process auxiliary trace segments (if any), to build a set of random elements for each segment
        let mut aux_trace_rand_elements = AuxTraceRandElements::<E>::new();
        for (i, commitment) in trace_commitments.iter().skip(1).enumerate() {
            let rand_elements = air
                .get_aux_trace_segment_random_elements(i, &mut public_coin)
                .map_err(|_| VerifierError::RandomCoinError)?;
            aux_trace_rand_elements.add_segment_elements(rand_elements);
            public_coin.reseed(*commitment);
        }

        // build random coefficients for the composition polynomial
        let constraint_coeffs = air
            .get_constraint_composition_coefficients(&mut public_coin)
            .map_err(|_| VerifierError::RandomCoinError)?;

        // 2 ----- constraint commitment --------------------------------------------------------------
        // read the commitment to evaluations of the constraint composition polynomial over the LDE
        // domain sent by the prover, use it to update the public coin, and draw an out-of-domain point
        // z from the coin; in the interactive version of the protocol, the verifier sends this point z
        // to the prover, and the prover evaluates trace and constraint composition polynomials at z,
        // and sends the results back to the verifier.
        let constraint_commitment = channel.read_constraint_commitment();
        public_coin.reseed(constraint_commitment);
        let z = public_coin
            .draw::<E>()
            .map_err(|_| VerifierError::RandomCoinError)?;

        // 3 ----- OOD consistency check --------------------------------------------------------------
        // make sure that evaluations obtained by evaluating constraints over the out-of-domain frame
        // are consistent with the evaluations of composition polynomial columns sent by the prover

        // read the out-of-domain trace frames (the main trace frame and auxiliary trace frame, if
        // provided) sent by the prover and evaluate constraints over them; also, reseed the public
        // coin with the OOD frames received from the prover.
        let (ood_main_trace_frame, ood_aux_trace_frame) = channel.read_ood_trace_frame();
        let ood_constraint_evaluation_1 = evaluate_constraints(
            &air,
            constraint_coeffs,
            &ood_main_trace_frame,
            &ood_aux_trace_frame,
            aux_trace_rand_elements,
            z,
        );

        if let Some(ref aux_trace_frame) = ood_aux_trace_frame {
            // when the trace contains auxiliary segments, append auxiliary trace elements at the
            // end of main trace elements for both current and next rows in the frame. this is
            // needed to be consistent with how the prover writes OOD frame into the channel.

            let mut current = ood_main_trace_frame.current().to_vec();
            current.extend_from_slice(aux_trace_frame.current());
            public_coin.reseed(H::hash_elements(&current));

            let mut next = ood_main_trace_frame.next().to_vec();
            next.extend_from_slice(aux_trace_frame.next());
            public_coin.reseed(H::hash_elements(&next));
        } else {
            public_coin.reseed(H::hash_elements(ood_main_trace_frame.current()));
            public_coin.reseed(H::hash_elements(ood_main_trace_frame.next()));
        }

        // read evaluations of composition polynomial columns sent by the prover, and reduce them into
        // a single value by computing sum(z^i * value_i), where value_i is the evaluation of the ith
        // column polynomial at z^m, where m is the total number of column polynomials; also, reseed
        // the public coin with the OOD constraint evaluations received from the prover.
        let ood_constraint_evaluations = channel.read_ood_constraint_evaluations();
        let ood_constraint_evaluation_2 = ood_constraint_evaluations
            .iter()
            .enumerate()
            .fold(E::ZERO, |result, (i, &value)| {
                result + z.exp((i as u32).into()) * value
            });
        public_coin.reseed(H::hash_elements(&ood_constraint_evaluations));

        // finally, make sure the values are the same
        if ood_constraint_evaluation_1 != ood_constraint_evaluation_2 {
            return Err(VerifierError::InconsistentOodConstraintEvaluations);
        }

        // 4 ----- FRI commitments --------------------------------------------------------------------
        // draw coefficients for computing DEEP composition polynomial from the public coin; in the
        // interactive version of the protocol, the verifier sends these coefficients to the prover
        // and the prover uses them to compute the DEEP composition polynomial. the prover, then
        // applies FRI protocol to the evaluations of the DEEP composition polynomial.
        let deep_coefficients = air
            .get_deep_composition_coefficients::<E, H>(&mut public_coin)
            .map_err(|_| VerifierError::RandomCoinError)?;

        // instantiates a FRI verifier with the FRI layer commitments read from the channel. From the
        // verifier's perspective, this is equivalent to executing the commit phase of the FRI protocol.
        // The verifier uses these commitments to update the public coin and draw random points alpha
        // from them; in the interactive version of the protocol, the verifier sends these alphas to
        // the prover, and the prover uses them to compute and commit to the subsequent FRI layers.
        let fri_verifier = FriVerifier::new(
            &mut channel,
            &mut public_coin,
            air.options().to_fri_options(),
            air.trace_poly_degree(),
        )
        .map_err(VerifierError::FriVerificationFailed)?;
        // TODO: make sure air.lde_domain_size() == fri_verifier.domain_size()

        // 5 ----- trace and constraint queries -------------------------------------------------------
        // read proof-of-work nonce sent by the prover and update the public coin with it
        let pow_nonce = channel.read_pow_nonce();
        public_coin.reseed_with_int(pow_nonce);

        // make sure the proof-of-work specified by the grinding factor is satisfied
        if public_coin.leading_zeros() < air.options().grinding_factor() {
            return Err(VerifierError::QuerySeedProofOfWorkVerificationFailed);
        }

        // draw pseudo-random query positions for the LDE domain from the public coin; in the
        // interactive version of the protocol, the verifier sends these query positions to the prover,
        // and the prover responds with decommitments against these positions for trace and constraint
        // composition polynomial evaluations.
        let query_positions = public_coin
            .draw_integers(air.options().num_queries(), air.lde_domain_size())
            .map_err(|_| VerifierError::RandomCoinError)?;

        // read evaluations of trace and constraint composition polynomials at the queried positions;
        // this also checks that the read values are valid against trace and constraint commitments
        let (queried_main_trace_states, queried_aux_trace_states) =
            channel.read_queried_trace_states(&query_positions)?;
        let queried_constraint_evaluations =
            channel.read_constraint_evaluations(&query_positions)?;

        // 6 ----- DEEP composition -------------------------------------------------------------------
        // compute evaluations of the DEEP composition polynomial at the queried positions
        let composer = DeepComposer::new(&air, &query_positions, z, deep_coefficients);
        let t_composition = composer.compose_trace_columns(
            queried_main_trace_states,
            queried_aux_trace_states,
            ood_main_trace_frame,
            ood_aux_trace_frame,
        );
        let c_composition = composer.compose_constraint_evaluations(
            queried_constraint_evaluations,
            ood_constraint_evaluations,
        );
        let deep_evaluations = composer.combine_compositions(t_composition, c_composition);

        // 7 ----- Verify low-degree proof -------------------------------------------------------------
        // make sure that evaluations of the DEEP composition polynomial we computed in the previous
        // step are in fact evaluations of a polynomial of degree equal to trace polynomial degree
        fri_verifier
            .verify(&mut channel, &deep_evaluations, &query_positions)
            .map_err(VerifierError::FriVerificationFailed)
    }

    /// Evaluates constraints for the specified evaluation frame.
    pub fn evaluate_constraints<A: Air, E: FieldElement<BaseField = A::BaseField>>(
        air: &A,
        composition_coefficients: ConstraintCompositionCoefficients<E>,
        main_trace_frame: &EvaluationFrame<E>,
        aux_trace_frame: &Option<EvaluationFrame<E>>,
        aux_rand_elements: AuxTraceRandElements<E>,
        x: E,
    ) -> E {
        // 1 ----- evaluate transition constraints ----------------------------------------------------

        // initialize a buffer to hold transition constraint evaluations
        let t_constraints = air.get_transition_constraints(&composition_coefficients.transition);

        // compute values of periodic columns at x
        let periodic_values = air
            .get_periodic_column_polys()
            .iter()
            .map(|poly| {
                let num_cycles = air.trace_length() / poly.len();
                let x = x.exp((num_cycles as u32).into());
                polynom::eval(poly, x)
            })
            .collect::<Vec<_>>();

        // evaluate transition constraints for the main trace segment
        let mut t_evaluations1 = E::zeroed_vector(t_constraints.num_main_constraints());
        air.evaluate_transition(main_trace_frame, &periodic_values, &mut t_evaluations1);

        // evaluate transition constraints for auxiliary trace segments (if any)
        let mut t_evaluations2 = E::zeroed_vector(t_constraints.num_aux_constraints());
        if let Some(aux_trace_frame) = aux_trace_frame {
            air.evaluate_aux_transition(
                main_trace_frame,
                aux_trace_frame,
                &periodic_values,
                &aux_rand_elements,
                &mut t_evaluations2,
            );
        }

        // merge all constraint evaluations into a single value by computing their random linear
        // combination using coefficients drawn from the public coin. this also divides the result
        // by the divisor of transition constraints.
        let mut result =
            t_constraints.combine_evaluations::<E>(&t_evaluations1, &t_evaluations2, x);

        // 2 ----- evaluate boundary constraints ------------------------------------------------------

        // get boundary constraints grouped by common divisor from the AIR
        let b_constraints =
            air.get_boundary_constraints(&aux_rand_elements, &composition_coefficients.boundary);

        // cache power of x here so that we only re-compute it when degree_adjustment changes
        let mut degree_adjustment = b_constraints.main_constraints()[0].degree_adjustment();
        let mut xp = x.exp(degree_adjustment.into());

        // iterate over boundary constraint groups for the main trace segment (each group has a
        // distinct divisor), evaluate constraints in each group and add their combination to the
        // result
        for group in b_constraints.main_constraints().iter() {
            // if adjustment degree hasn't changed, no need to recompute `xp` - so just reuse the
            // previous value; otherwise, compute new `xp`
            if group.degree_adjustment() != degree_adjustment {
                degree_adjustment = group.degree_adjustment();
                xp = x.exp(degree_adjustment.into());
            }
            // evaluate all constraints in the group, and add the evaluation to the result
            result += group.evaluate_at(main_trace_frame.current(), x, xp);
        }

        // iterate over boundary constraint groups for auxiliary trace segments (each group has a
        // distinct divisor), evaluate constraints in each group and add their combination to the
        // result
        if let Some(aux_trace_frame) = aux_trace_frame {
            for group in b_constraints.aux_constraints().iter() {
                // if adjustment degree hasn't changed, no need to recompute `xp` - so just reuse the
                // previous value; otherwise, compute new `xp`
                if group.degree_adjustment() != degree_adjustment {
                    degree_adjustment = group.degree_adjustment();
                    xp = x.exp(degree_adjustment.into());
                }
                // evaluate all constraints in the group, and add the evaluation to the result
                result += group.evaluate_at(aux_trace_frame.current(), x, xp);
            }
        }
        result
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetVerifResult {} => to_binary(&query::result(deps)?),
    }
}

pub mod query {
    use super::*;
    pub fn result(deps: Deps) -> StdResult<GetResultResponse> {
        let state = STATE.load(deps.storage)?;
        Ok(GetResultResponse {
            result: state.result,
        })
    }
}

pub struct VerifierChannel<E: FieldElement, H: ElementHasher<BaseField = E::BaseField>> {
    // trace queries
    trace_roots: Vec<H::Digest>,
    trace_queries: Option<TraceQueries<E, H>>,
    // constraint queries
    constraint_root: H::Digest,
    constraint_queries: Option<ConstraintQueries<E, H>>,
    // FRI proof
    fri_roots: Option<Vec<H::Digest>>,
    fri_layer_proofs: Vec<BatchMerkleProof<H>>,
    fri_layer_queries: Vec<Vec<E>>,
    fri_remainder: Option<Vec<E>>,
    fri_num_partitions: usize,
    // out-of-domain frame
    ood_trace_frame: Option<TraceOodFrame<E>>,
    ood_constraint_evaluations: Option<Vec<E>>,
    // query proof-of-work
    pow_nonce: u64,
}

impl<E: FieldElement, H: ElementHasher<BaseField = E::BaseField>> VerifierChannel<E, H> {
    // CONSTRUCTOR
    // --------------------------------------------------------------------------------------------
    /// Creates and returns a new [VerifierChannel] initialized from the specified `proof`.
    pub fn new<A: Air<BaseField = E::BaseField>>(
        air: &A,
        proof: StarkProof,
    ) -> Result<Self, VerifierError> {
        let StarkProof {
            context,
            commitments,
            trace_queries,
            constraint_queries,
            ood_frame,
            fri_proof,
            pow_nonce,
        } = proof;

        // make AIR and proof base fields are the same
        if E::BaseField::get_modulus_le_bytes() != context.field_modulus_bytes() {
            return Err(VerifierError::InconsistentBaseField);
        }

        let num_trace_segments = air.trace_layout().num_segments();
        let main_trace_width = air.trace_layout().main_trace_width();
        let aux_trace_width = air.trace_layout().aux_trace_width();
        let lde_domain_size = air.lde_domain_size();
        let fri_options = air.options().to_fri_options();

        // --- parse commitments ------------------------------------------------------------------
        let (trace_roots, constraint_root, fri_roots) = commitments
            .parse::<H>(
                num_trace_segments,
                fri_options.num_fri_layers(lde_domain_size),
            )
            .map_err(|err| VerifierError::ProofDeserializationError(err.to_string()))?;

        // --- parse trace and constraint queries -------------------------------------------------
        let trace_queries = TraceQueries::new(trace_queries, air)?;
        let constraint_queries = ConstraintQueries::new(constraint_queries, air)?;

        // --- parse FRI proofs -------------------------------------------------------------------
        let fri_num_partitions = fri_proof.num_partitions();
        let fri_remainder = fri_proof
            .parse_remainder()
            .map_err(|err| VerifierError::ProofDeserializationError(err.to_string()))?;
        let (fri_layer_queries, fri_layer_proofs) = fri_proof
            .parse_layers::<H, E>(lde_domain_size, fri_options.folding_factor())
            .map_err(|err| VerifierError::ProofDeserializationError(err.to_string()))?;

        // --- parse out-of-domain evaluation frame -----------------------------------------------
        let (ood_main_trace_frame, ood_aux_trace_frame, ood_constraint_evaluations) = ood_frame
            .parse(main_trace_width, aux_trace_width, air.ce_blowup_factor())
            .map_err(|err| VerifierError::ProofDeserializationError(err.to_string()))?;
        let ood_trace_frame = TraceOodFrame::new(ood_main_trace_frame, ood_aux_trace_frame);

        Ok(VerifierChannel {
            // trace queries
            trace_roots,
            trace_queries: Some(trace_queries),
            // constraint queries
            constraint_root,
            constraint_queries: Some(constraint_queries),
            // FRI proof
            fri_roots: Some(fri_roots),
            fri_layer_proofs,
            fri_layer_queries,
            fri_remainder: Some(fri_remainder),
            fri_num_partitions,
            // out-of-domain evaluation
            ood_trace_frame: Some(ood_trace_frame),
            ood_constraint_evaluations: Some(ood_constraint_evaluations),
            // query seed
            pow_nonce,
        })
    }

    // DATA READERS
    // --------------------------------------------------------------------------------------------

    /// Returns execution trace commitments sent by the prover.
    ///
    /// For computations requiring multiple trace segment, the returned slice will contain a
    /// commitment for each trace segment.
    pub fn read_trace_commitments(&self) -> &[H::Digest] {
        &self.trace_roots
    }

    /// Returns constraint evaluation commitment sent by the prover.
    pub fn read_constraint_commitment(&self) -> H::Digest {
        self.constraint_root
    }

    /// Returns trace polynomial evaluations at out-of-domain points z and z * g, where g is the
    /// generator of the LDE domain.
    ///
    /// For computations requiring multiple trace segments, evaluations of auxiliary trace
    /// polynomials are also included as the second value of the returned tuple. Otherwise, the
    /// second value is None.
    pub fn read_ood_trace_frame(&mut self) -> (EvaluationFrame<E>, Option<EvaluationFrame<E>>) {
        let frame = self.ood_trace_frame.take().expect("already read");
        (frame.main_frame, frame.aux_frame)
    }

    /// Returns evaluations of composition polynomial columns at z^m, where z is the out-of-domain
    /// point, and m is the number of composition polynomial columns.
    pub fn read_ood_constraint_evaluations(&mut self) -> Vec<E> {
        self.ood_constraint_evaluations
            .take()
            .expect("already read")
    }

    /// Returns query proof-of-work nonce sent by the prover.
    pub fn read_pow_nonce(&self) -> u64 {
        self.pow_nonce
    }

    /// Returns trace states at the specified positions of the LDE domain. This also checks if
    /// the trace states are valid against the trace commitment sent by the prover.
    ///
    /// For computations requiring multiple trace segments, trace states for auxiliary segments
    /// are also included as the second value of the returned tuple (trace states for all auxiliary
    /// segments are merged into a single table). Otherwise, the second value is None.
    #[allow(clippy::type_complexity)]
    pub fn read_queried_trace_states(
        &mut self,
        positions: &[usize],
    ) -> Result<(Table<E::BaseField>, Option<Table<E>>), VerifierError> {
        let queries = self.trace_queries.take().expect("already read");

        // make sure the states included in the proof correspond to the trace commitment
        for (root, proof) in self.trace_roots.iter().zip(queries.query_proofs.iter()) {
            MerkleTree::verify_batch(root, positions, proof)
                .map_err(|_| VerifierError::TraceQueryDoesNotMatchCommitment)?;
        }

        Ok((queries.main_states, queries.aux_states))
    }

    /// Returns constraint evaluations at the specified positions of the LDE domain. This also
    /// checks if the constraint evaluations are valid against the constraint commitment sent by
    /// the prover.
    pub fn read_constraint_evaluations(
        &mut self,
        positions: &[usize],
    ) -> Result<Table<E>, VerifierError> {
        let queries = self.constraint_queries.take().expect("already read");

        MerkleTree::verify_batch(&self.constraint_root, positions, &queries.query_proofs)
            .map_err(|_| VerifierError::ConstraintQueryDoesNotMatchCommitment)?;

        Ok(queries.evaluations)
    }
}

impl<E, H> FriVerifierChannel<E> for VerifierChannel<E, H>
where
    E: FieldElement,
    H: ElementHasher<BaseField = E::BaseField>,
{
    type Hasher = H;

    fn read_fri_num_partitions(&self) -> usize {
        self.fri_num_partitions
    }

    fn read_fri_layer_commitments(&mut self) -> Vec<H::Digest> {
        self.fri_roots.take().expect("already read")
    }

    fn take_next_fri_layer_proof(&mut self) -> BatchMerkleProof<H> {
        self.fri_layer_proofs.remove(0)
    }

    fn take_next_fri_layer_queries(&mut self) -> Vec<E> {
        self.fri_layer_queries.remove(0)
    }

    fn take_fri_remainder(&mut self) -> Vec<E> {
        self.fri_remainder.take().expect("already read")
    }
}

// TRACE QUERIES
// ================================================================================================

/// Container of trace query data, including:
/// * Queried states for all trace segments.
/// * Merkle authentication paths for all queries.
///
/// Trace states for all auxiliary segments are stored in a single table.
struct TraceQueries<E: FieldElement, H: ElementHasher<BaseField = E::BaseField>> {
    query_proofs: Vec<BatchMerkleProof<H>>,
    main_states: Table<E::BaseField>,
    aux_states: Option<Table<E>>,
}

impl<E: FieldElement, H: ElementHasher<BaseField = E::BaseField>> TraceQueries<E, H> {
    /// Parses the provided trace queries into trace states in the specified field and
    /// corresponding Merkle authentication paths.
    pub fn new<A: Air<BaseField = E::BaseField>>(
        mut queries: Vec<Queries>,
        air: &A,
    ) -> Result<Self, VerifierError> {
        assert_eq!(
            queries.len(),
            air.trace_layout().num_segments(),
            "expected {} trace segment queries, but received {}",
            air.trace_layout().num_segments(),
            queries.len()
        );

        let num_queries = air.options().num_queries();

        // parse main trace segment queries; parsing also validates that hashes of each table row
        // form the leaves of Merkle authentication paths in the proofs
        let main_segment_width = air.trace_layout().main_trace_width();
        let main_segment_queries = queries.remove(0);
        let (main_segment_query_proofs, main_segment_states) = main_segment_queries
            .parse::<H, E::BaseField>(air.lde_domain_size(), num_queries, main_segment_width)
            .map_err(|err| {
                VerifierError::ProofDeserializationError(format!(
                    "main trace segment query deserialization failed: {}",
                    err
                ))
            })?;

        // all query proofs will be aggregated into a single vector
        let mut query_proofs = vec![main_segment_query_proofs];

        // parse auxiliary trace segment queries (if any), and merge resulting tables into a
        // single table; parsing also validates that hashes of each table row form the leaves
        // of Merkle authentication paths in the proofs
        let aux_trace_states = if air.trace_info().is_multi_segment() {
            let mut aux_trace_states = Vec::new();
            for (i, segment_queries) in queries.into_iter().enumerate() {
                let segment_width = air.trace_layout().get_aux_segment_width(i);
                let (segment_query_proof, segment_trace_states) = segment_queries
                    .parse::<H, E>(air.lde_domain_size(), num_queries, segment_width)
                    .map_err(|err| {
                        VerifierError::ProofDeserializationError(format!(
                            "auxiliary trace segment query deserialization failed: {}",
                            err
                        ))
                    })?;

                query_proofs.push(segment_query_proof);
                aux_trace_states.push(segment_trace_states);
            }

            // merge tables for each auxiliary segment into a single table
            Some(Table::merge(aux_trace_states))
        } else {
            None
        };

        Ok(Self {
            query_proofs,
            main_states: main_segment_states,
            aux_states: aux_trace_states,
        })
    }
}

// CONSTRAINT QUERIES
// ================================================================================================

/// Container of constraint evaluation query data, including:
/// * Queried constraint evaluation values.
/// * Merkle authentication paths for all queries.
struct ConstraintQueries<E: FieldElement, H: ElementHasher<BaseField = E::BaseField>> {
    query_proofs: BatchMerkleProof<H>,
    evaluations: Table<E>,
}

impl<E: FieldElement, H: ElementHasher<BaseField = E::BaseField>> ConstraintQueries<E, H> {
    /// Parses the provided constraint queries into evaluations in the specified field and
    /// corresponding Merkle authentication paths.
    pub fn new<A: Air<BaseField = E::BaseField>>(
        queries: Queries,
        air: &A,
    ) -> Result<Self, VerifierError> {
        let num_queries = air.options().num_queries();
        let (query_proofs, evaluations) = queries
            .parse::<H, E>(air.lde_domain_size(), num_queries, air.ce_blowup_factor())
            .map_err(|err| {
                VerifierError::ProofDeserializationError(format!(
                    "constraint evaluation query deserialization failed: {}",
                    err
                ))
            })?;

        Ok(Self {
            query_proofs,
            evaluations,
        })
    }
}

// TRACE OUT-OF-DOMAIN FRAME
// ================================================================================================

struct TraceOodFrame<E: FieldElement> {
    main_frame: EvaluationFrame<E>,
    aux_frame: Option<EvaluationFrame<E>>,
}

impl<E: FieldElement> TraceOodFrame<E> {
    pub fn new(main_frame: EvaluationFrame<E>, aux_frame: Option<EvaluationFrame<E>>) -> Self {
        Self {
            main_frame,
            aux_frame,
        }
    }
}

// DEEP COMPOSER
// ================================================================================================

pub struct DeepComposer<E: FieldElement> {
    field_extension: FieldExtension,
    cc: DeepCompositionCoefficients<E>,
    x_coordinates: Vec<E>,
    z: [E; 2],
}

impl<E: FieldElement> DeepComposer<E> {
    /// Creates a new composer for computing DEEP composition polynomial values.
    pub fn new<A: Air<BaseField = E::BaseField>>(
        air: &A,
        query_positions: &[usize],
        z: E,
        cc: DeepCompositionCoefficients<E>,
    ) -> Self {
        // compute LDE domain coordinates for all query positions
        let g_lde = air.lde_domain_generator();
        let domain_offset = air.domain_offset();
        let x_coordinates: Vec<E> = query_positions
            .iter()
            .map(|&p| E::from(g_lde.exp((p as u64).into()) * domain_offset))
            .collect();

        DeepComposer {
            field_extension: air.options().field_extension(),
            cc,
            x_coordinates,
            z: [z, z * E::from(air.trace_domain_generator())],
        }
    }

    /// For each queried trace state, combines column values into a single value by computing
    /// their random linear combinations as follows:
    ///
    /// - Assume each column value is an evaluation of a trace polynomial T_i(x).
    /// - For each T_i(x) compute T'_i(x) = (T_i(x) - T_i(z)) / (x - z) and
    ///   T''_i = (T_i(x) - T_i(z * g)) / (x - z * g), where z is the out-of-domain point and
    ///   g is the generation of the LDE domain.
    /// - Then, combine all T'_i(x) and T''_i(x) values together by computing
    ///   T(x) = sum(T'_i(x) * cc'_i + T''_i(x) * cc''_i) for all i, where cc'_i and cc''_i are
    ///   the coefficients for the random linear combination drawn from the public coin.
    /// - In cases when the proof was generated using an extension field, we also compute
    ///   T'''_i(x) = (T_i(x) - T_i(z_conjugate)) / (x - z_conjugate), and add it to T(x) similarly
    ///   to the way described above. This is needed in order to verify that the trace is defined
    ///   over the base field, rather than the extension field.
    ///
    /// Note that values of T_i(z) and T_i(z * g) are received from the prover and passed into
    /// this function via the `ood_frame` parameter.
    pub fn compose_trace_columns(
        &self,
        queried_main_trace_states: Table<E::BaseField>,
        queried_aux_trace_states: Option<Table<E>>,
        ood_main_frame: EvaluationFrame<E>,
        ood_aux_frame: Option<EvaluationFrame<E>>,
    ) -> Vec<E> {
        let ood_main_trace_states = [ood_main_frame.current(), ood_main_frame.next()];

        // when field extension is enabled, these will be set to conjugates of trace values at
        // z as well as conjugate of z itself. we do this only for the main trace since auxiliary
        // trace columns are in the extension field.
        let conjugate_values =
            get_conjugate_values(self.field_extension, ood_main_trace_states[0], self.z[0]);

        // compose columns of of the main trace segment
        let mut result = E::zeroed_vector(queried_main_trace_states.num_rows());
        for ((result, row), &x) in result
            .iter_mut()
            .zip(queried_main_trace_states.rows())
            .zip(&self.x_coordinates)
        {
            for (i, &value) in row.iter().enumerate() {
                let value = E::from(value);
                // compute T'_i(x) = (T_i(x) - T_i(z)) / (x - z), multiply it by a composition
                // coefficient, and add the result to T(x)
                let t1 = (value - ood_main_trace_states[0][i]) / (x - self.z[0]);
                *result += t1 * self.cc.trace[i].0;

                // compute T''_i(x) = (T_i(x) - T_i(z * g)) / (x - z * g), multiply it by a
                // composition coefficient, and add the result to T(x)
                let t2 = (value - ood_main_trace_states[1][i]) / (x - self.z[1]);
                *result += t2 * self.cc.trace[i].1;

                // when extension field is enabled compute
                // T'''_i(x) = (T_i(x) - T_i(z_conjugate)) / (x - z_conjugate)
                if let Some((z_conjugate, ref trace_at_z1_conjugates)) = conjugate_values {
                    let t3 = (value - trace_at_z1_conjugates[i]) / (x - z_conjugate);
                    *result += t3 * self.cc.trace[i].2;
                }
            }
        }

        // if the trace has auxiliary segments, compose columns from these segments as well
        if let Some(queried_aux_trace_states) = queried_aux_trace_states {
            let ood_aux_frame = ood_aux_frame.expect("missing auxiliary OOD frame");
            let ood_aux_trace_states = [ood_aux_frame.current(), ood_aux_frame.next()];

            // we define this offset here because composition of the main trace columns has
            // consumed some number of composition coefficients already.
            let cc_offset = queried_main_trace_states.num_columns();

            for ((result, row), &x) in result
                .iter_mut()
                .zip(queried_aux_trace_states.rows())
                .zip(&self.x_coordinates)
            {
                for (i, &value) in row.iter().enumerate() {
                    // compute T'_i(x) = (T_i(x) - T_i(z)) / (x - z), multiply it by a composition
                    // coefficient, and add the result to T(x)
                    let t1 = (value - ood_aux_trace_states[0][i]) / (x - self.z[0]);
                    *result += t1 * self.cc.trace[cc_offset + i].0;

                    // compute T''_i(x) = (T_i(x) - T_i(z * g)) / (x - z * g), multiply it by a
                    // composition coefficient, and add the result to T(x)
                    let t2 = (value - ood_aux_trace_states[1][i]) / (x - self.z[1]);
                    *result += t2 * self.cc.trace[cc_offset + i].1;
                }
            }
        }

        result
    }

    /// For each queried set of composition polynomial column evaluations, combine evaluations
    /// into a single value by computing their random linear combination as follows:
    ///
    /// - Assume each queried value is an evaluation of a composition polynomial column H_i(x).
    /// - For each H_i(x), compute H'_i(x) = (H_i(x) - H(z^m)) / (x - z^m), where m is the total
    ///   number of composition polynomial columns.
    /// - Then, combine all H_i(x) values together by computing H(x) = sum(H_i(x) * cc_i) for
    ///   all i, where cc_i is the coefficient for the random linear combination drawn from the
    ///   public coin.
    ///
    /// Note that values of H_i(z^m)are received from teh prover and passed into this function
    /// via the `ood_evaluations` parameter.
    pub fn compose_constraint_evaluations(
        &self,
        queried_evaluations: Table<E>,
        ood_evaluations: Vec<E>,
    ) -> Vec<E> {
        assert_eq!(queried_evaluations.num_rows(), self.x_coordinates.len());

        let mut result = Vec::with_capacity(queried_evaluations.num_rows());

        // compute z^m
        let num_evaluation_columns = ood_evaluations.len() as u32;
        let z_m = self.z[0].exp(num_evaluation_columns.into());

        for (query_values, &x) in queried_evaluations.rows().zip(&self.x_coordinates) {
            let mut composition = E::ZERO;
            for (i, &evaluation) in query_values.iter().enumerate() {
                // compute H'_i(x) = (H_i(x) - H(z^m)) / (x - z^m)
                let h_i = (evaluation - ood_evaluations[i]) / (x - z_m);
                // multiply it by a pseudo-random coefficient, and add the result to H(x)
                composition += h_i * self.cc.constraints[i];
            }
            result.push(composition);
        }

        result
    }

    /// Combines trace and constraint compositions together, and also rases the degree of the
    /// resulting value by one to match trace polynomial degree. This is needed because when
    /// we divide evaluations by (x - z), (x - z * g) etc. the degree is reduced by one - so,
    /// we compensate for it here.
    #[rustfmt::skip]
    pub fn combine_compositions(&self, t_composition: Vec<E>, c_composition: Vec<E>) -> Vec<E> {
        assert_eq!(t_composition.len(), self.x_coordinates.len());
        assert_eq!(c_composition.len(), self.x_coordinates.len());

        let mut result = Vec::with_capacity(self.x_coordinates.len());
        for ((&x, t), c) in self.x_coordinates.iter().zip(t_composition).zip(c_composition) {
            // compute C(x) by adding the two compositions together
            let composition = t + c;

            // raise the degree of C(x) by computing C'(x) = C(x) * (cc_0 + x * cc_1), where
            // cc_0 and cc_1 are the coefficients for the random linear combination drawn from
            // the public coin.
            result.push(composition * (self.cc.degree.0 + x * self.cc.degree.1));
        }

        result
    }
}

// HELPER FUNCTIONS
// ================================================================================================

/// When field extension is used, returns conjugate values of the `trace_state` and `z`;
/// otherwise, returns None.
fn get_conjugate_values<E: FieldElement>(
    extension: FieldExtension,
    trace_state: &[E],
    z: E,
) -> Option<(E, Vec<E>)> {
    if extension.is_none() {
        None
    } else {
        Some((
            z.conjugate(),
            trace_state.iter().map(|v| v.conjugate()).collect(),
        ))
    }
}

// FRI VERIFIER
// ================================================================================================
/// Implements the verifier component of the FRI protocol.
///
/// Given a small number of evaluations of some function *f* over domain *D* and a FRI proof, a
/// FRI verifier determines whether *f* is a polynomial of some bounded degree *d*, such that *d*
/// < |*D*| / 2.
///
/// The verifier is parametrized by the following types:
///
/// * `B` specifies the base field of the STARK protocol.
/// * `E` specifies the field in which the FRI protocol is executed. This can be the same as the
///   base field `B`, but it can also be an extension of the base field in cases when the base
///   field is too small to provide desired security level for the FRI protocol.
/// * `C` specifies the type used to simulate prover-verifier interaction. This type is used
///   as an abstraction for a [FriProof](crate::FriProof). Meaning, the verifier does not consume
///   a FRI proof directly, but reads it via [VerifierChannel] interface.
/// * `H` specifies the Hash function used by the prover to commit to polynomial evaluations.
///
/// Proof verification is performed in two phases: commit phase and query phase.
///
/// # Commit phase
/// During the commit phase, which is executed when the verifier is instantiated via
/// [new()](FriVerifier::new()) function, the verifier receives a list of FRI layer commitments
/// from the prover (via [VerifierChannel]). After each received commitment, the verifier
/// draws a random value α from the entire field, and sends it to the prover. In the
/// non-interactive version of the protocol, α values are derived pseudo-randomly from FRI
/// layer commitments.
///
/// # Query phase
/// During the query phase, which is executed via [verify()](FriVerifier::verify()) function,
/// the verifier sends a set of positions in the domain *D* to the prover, and the prover responds
/// with polynomial evaluations at these positions (together with corresponding Merkle paths)
/// across all FRI layers. The verifier then checks that:
/// * The Merkle paths are valid against the layer commitments the verifier received during
///   the commit phase.
/// * The evaluations are consistent across FRI layers (i.e., the degree-respecting projection
///   was applied correctly).
/// * The degree of the polynomial implied by evaluations at the last FRI layer (the remainder)
///   is smaller than the degree resulting from reducing degree *d* by `folding_factor` at each
///   FRI layer.
pub struct FriVerifier<B, E, C, H>
where
    B: StarkField,
    E: FieldElement<BaseField = B>,
    C: FriVerifierChannel<E, Hasher = H>,
    H: ElementHasher<BaseField = B>,
{
    max_poly_degree: usize,
    domain_size: usize,
    domain_generator: B,
    layer_commitments: Vec<H::Digest>,
    layer_alphas: Vec<E>,
    options: FriOptions,
    num_partitions: usize,
    _channel: PhantomData<C>,
}

impl<B, E, C, H> FriVerifier<B, E, C, H>
where
    B: StarkField,
    E: FieldElement<BaseField = B>,
    C: FriVerifierChannel<E, Hasher = H>,
    H: ElementHasher<BaseField = B>,
{
    /// Returns a new instance of FRI verifier created from the specified parameters.
    ///
    /// The `max_poly_degree` parameter specifies the highest polynomial degree accepted by the
    /// returned verifier. In combination with `blowup_factor` from the `options` parameter,
    /// `max_poly_degree` also defines the domain over which the tested polynomial is evaluated.
    ///
    /// Creating a FRI verifier executes the commit phase of the FRI protocol from the verifier's
    /// perspective. Specifically, the verifier reads FRI layer commitments from the `channel`,
    /// and for each commitment, updates the `public_coin` with this commitment and then draws
    /// a random value α from the coin.
    ///
    /// The verifier stores layer commitments and corresponding α values in its internal state,
    /// and, thus, an instance of FRI verifier can be used to verify only a single proof.
    ///
    /// # Errors
    /// Returns an error if:
    /// * `max_poly_degree` is inconsistent with the number of FRI layers read from the channel
    ///   and `folding_factor` specified in the `options` parameter.
    /// * An error was encountered while drawing a random α value from the coin.
    pub fn new(
        channel: &mut C,
        public_coin: &mut RandomCoin<B, H>,
        options: FriOptions,
        max_poly_degree: usize,
    ) -> Result<Self, FriVerifierError> {
        // infer evaluation domain info
        let domain_size = max_poly_degree.next_power_of_two() * options.blowup_factor();
        let domain_generator = B::get_root_of_unity(log2(domain_size));

        let num_partitions = channel.read_fri_num_partitions();

        // read layer commitments from the channel and use them to build a list of alphas
        let layer_commitments = channel.read_fri_layer_commitments();
        let mut layer_alphas = Vec::with_capacity(layer_commitments.len());
        let mut max_degree_plus_1 = max_poly_degree + 1;
        for (depth, commitment) in layer_commitments.iter().enumerate() {
            public_coin.reseed(*commitment);
            let alpha = public_coin
                .draw()
                .map_err(FriVerifierError::PublicCoinError)?;
            layer_alphas.push(alpha);

            // make sure the degree can be reduced by the folding factor at all layers
            // but the remainder layer
            if depth != layer_commitments.len() - 1
                && max_degree_plus_1 % options.folding_factor() != 0
            {
                return Err(FriVerifierError::DegreeTruncation(
                    max_degree_plus_1 - 1,
                    options.folding_factor(),
                    depth,
                ));
            }
            max_degree_plus_1 /= options.folding_factor();
        }

        Ok(FriVerifier {
            max_poly_degree,
            domain_size,
            domain_generator,
            layer_commitments,
            layer_alphas,
            options,
            num_partitions,
            _channel: PhantomData,
        })
    }

    // PUBLIC ACCESSORS
    // --------------------------------------------------------------------------------------------

    /// Returns maximum degree of a polynomial accepted by this verifier.
    pub fn max_poly_degree(&self) -> usize {
        self.max_poly_degree
    }

    /// Returns size of the domain over which a polynomial commitment checked by this verifier
    /// has been evaluated.
    ///
    /// The domain size can be computed by rounding `max_poly_degree` to the next power of two
    /// and multiplying the result by the `blowup_factor` from the protocol options.
    pub fn domain_size(&self) -> usize {
        self.domain_size
    }

    /// Returns number of partitions used during FRI proof generation.
    ///
    /// For non-distributed proof generation, number of partitions is usually set to 1.
    pub fn num_partitions(&self) -> usize {
        self.num_partitions
    }

    /// Returns protocol configuration options for this verifier.
    pub fn options(&self) -> &FriOptions {
        &self.options
    }

    // VERIFICATION PROCEDURE
    // --------------------------------------------------------------------------------------------
    /// Executes the query phase of the FRI protocol.
    ///
    /// Returns `Ok(())` if values in the `evaluations` slice represent evaluations of a polynomial
    /// with degree <= `max_poly_degree` at x coordinates specified by the `positions` slice.
    ///
    /// Thus, `positions` parameter represents the positions in the evaluation domain at which the
    /// verifier queries the prover at the first FRI layer. Similarly, the `evaluations` parameter
    /// specifies the evaluations of the polynomial at the first FRI layer returned by the prover
    /// for these positions.
    ///
    /// Evaluations of layer polynomials for all subsequent FRI layers the verifier reads from the
    /// specified `channel`.
    ///
    /// # Errors
    /// Returns an error if:
    /// * The length of `evaluations` is not equal to the length of `positions`.
    /// * An unsupported folding factor was specified by the `options` for this verifier.
    /// * Decommitments to polynomial evaluations don't match the commitment value at any of the
    ///   FRI layers.
    /// * The verifier detects an error in how the degree-respecting projection was applied
    ///   at any of the FRI layers.
    /// * The degree of the remainder at the last FRI layer is greater than the degree implied by
    ///   `max_poly_degree` reduced by the folding factor at each FRI layer.
    pub fn verify(
        &self,
        channel: &mut C,
        evaluations: &[E],
        positions: &[usize],
    ) -> Result<(), FriVerifierError> {
        if evaluations.len() != positions.len() {
            return Err(FriVerifierError::NumPositionEvaluationMismatch(
                positions.len(),
                evaluations.len(),
            ));
        }

        // static dispatch for folding factor parameter
        let folding_factor = self.options.folding_factor();
        match folding_factor {
            2 => self.verify_generic::<2>(channel, evaluations, positions),
            4 => self.verify_generic::<4>(channel, evaluations, positions),
            8 => self.verify_generic::<8>(channel, evaluations, positions),
            16 => self.verify_generic::<16>(channel, evaluations, positions),
            _ => Err(FriVerifierError::UnsupportedFoldingFactor(folding_factor)),
        }
    }

    /// This is the actual implementation of the verification procedure described above, but it
    /// also takes folding factor as a generic parameter N.
    fn verify_generic<const N: usize>(
        &self,
        channel: &mut C,
        evaluations: &[E],
        positions: &[usize],
    ) -> Result<(), FriVerifierError> {
        // pre-compute roots of unity used in computing x coordinates in the folded domain
        let folding_roots = (0..N)
            .map(|i| {
                self.domain_generator
                    .exp(((self.domain_size / N * i) as u64).into())
            })
            .collect::<Vec<_>>();

        // 1 ----- verify the recursive components of the FRI proof -----------------------------------
        let mut domain_generator = self.domain_generator;
        let mut domain_size = self.domain_size;
        let mut max_degree_plus_1 = self.max_poly_degree + 1;
        let mut positions = positions.to_vec();
        let mut evaluations = evaluations.to_vec();

        for depth in 0..self.options.num_fri_layers(self.domain_size) {
            // determine which evaluations were queried in the folded layer
            let mut folded_positions =
                fold_positions(&positions, domain_size, self.options.folding_factor());
            // determine where these evaluations are in the commitment Merkle tree
            let position_indexes = map_positions_to_indexes(
                &folded_positions,
                domain_size,
                self.options.folding_factor(),
                self.num_partitions,
            );
            // read query values from the specified indexes in the Merkle tree
            let layer_commitment = self.layer_commitments[depth];
            // TODO: add layer depth to the potential error message
            let layer_values = channel.read_layer_queries(&position_indexes, &layer_commitment)?;
            let query_values =
                get_query_values::<E, N>(&layer_values, &positions, &folded_positions, domain_size);
            if evaluations != query_values {
                return Err(FriVerifierError::InvalidLayerFolding(depth));
            }

            // build a set of x coordinates for each row polynomial
            #[rustfmt::skip]
            let xs = folded_positions.iter().map(|&i| {
                let xe = domain_generator.exp((i as u64).into()) * self.options.domain_offset();
                folding_roots.iter()
                    .map(|&r| E::from(xe * r))
                    .collect::<Vec<_>>().try_into().unwrap()
            })
            .collect::<Vec<_>>();

            // interpolate x and y values into row polynomials
            let row_polys = polynom::interpolate_batch(&xs, &layer_values);

            // calculate the pseudo-random value used for linear combination in layer folding
            let alpha = self.layer_alphas[depth];

            // check that when the polynomials are evaluated at alpha, the result is equal to
            // the corresponding column value
            evaluations = row_polys.iter().map(|p| polynom::eval(p, alpha)).collect();

            // make sure next degree reduction does not result in degree truncation
            if max_degree_plus_1 % N != 0 {
                return Err(FriVerifierError::DegreeTruncation(
                    max_degree_plus_1 - 1,
                    N,
                    depth,
                ));
            }

            // update variables for the next iteration of the loop
            domain_generator = domain_generator.exp((N as u32).into());
            max_degree_plus_1 /= N;
            domain_size /= N;
            mem::swap(&mut positions, &mut folded_positions);
        }

        // 2 ----- verify the remainder of the FRI proof ----------------------------------------------

        // read the remainder from the channel and make sure it matches with the columns
        // of the previous layer
        let remainder_commitment = self.layer_commitments.last().unwrap();
        let remainder = channel.read_remainder::<N>(remainder_commitment)?;
        for (&position, evaluation) in positions.iter().zip(evaluations) {
            if remainder[position] != evaluation {
                return Err(FriVerifierError::InvalidRemainderFolding);
            }
        }

        // make sure the remainder values satisfy the degree
        verify_remainder(remainder, max_degree_plus_1 - 1)
    }
}

// REMAINDER DEGREE VERIFICATION
// ================================================================================================
/// Returns Ok(true) if values in the `remainder` slice represent evaluations of a polynomial
/// with degree <= `max_degree` against a domain of the same size as `remainder`.
fn verify_remainder<B: StarkField, E: FieldElement<BaseField = B>>(
    mut remainder: Vec<E>,
    max_degree: usize,
) -> Result<(), FriVerifierError> {
    if max_degree >= remainder.len() - 1 {
        return Err(FriVerifierError::RemainderDegreeNotValid);
    }
    // in case `remainder` represents a polynomial of degree `0` then the final check simplifies
    // to checking that the codeword values are identical.
    if max_degree == 0 {
        if !remainder.windows(2).all(|a| a[0] == a[1]) {
            Err(FriVerifierError::RemainderDegreeMismatch(max_degree))
        } else {
            Ok(())
        }
    } else {
        // interpolate remainder polynomial from its evaluations; we don't shift the domain here
        // because the degree of the polynomial will not change as long as we interpolate over a
        // coset of the original domain.
        let inv_twiddles = fft::get_inv_twiddles(remainder.len());
        fft::interpolate_poly(&mut remainder, &inv_twiddles);
        let poly = remainder;

        // make sure the degree is valid
        if max_degree < polynom::degree_of(&poly) {
            Err(FriVerifierError::RemainderDegreeMismatch(max_degree))
        } else {
            Ok(())
        }
    }
}

// HELPER FUNCTIONS
// ================================================================================================
fn get_query_values<E: FieldElement, const N: usize>(
    values: &[[E; N]],
    positions: &[usize],
    folded_positions: &[usize],
    domain_size: usize,
) -> Vec<E> {
    let row_length = domain_size / N;

    let mut result = Vec::new();
    for position in positions {
        let idx = folded_positions
            .iter()
            .position(|&v| v == position % row_length)
            .unwrap();
        let value = values[idx][position / row_length];
        result.push(value);
    }
    result
}