#![cfg(feature = "gpu")]

use crate::constraints::AlgebraicExpression;
use crate::constraints::EvaluationLde;
use crate::constraints::FieldConstant;
use crate::constraints::FieldType;
use crate::Air;
use crate::Matrix;
use alloc::collections::BTreeMap;
use alloc::rc::Rc;
use alloc::vec::Vec;
use ark_ff::One;
use ark_poly::EvaluationDomain;
use gpu_poly::prelude::PageAlignedAllocator;
use gpu_poly::prelude::PLANNER;
use gpu_poly::prelude::*;
use gpu_poly::stage::AddAssignConstStage;
use gpu_poly::stage::AddIntoConstStage;
use gpu_poly::stage::AddIntoStage;
use gpu_poly::stage::ConvertIntoStage;
use gpu_poly::stage::ExpInPlaceStage;
use gpu_poly::stage::ExpIntoStage;
use gpu_poly::stage::InverseInPlaceStage;
use gpu_poly::stage::MulAssignConstStage;
use gpu_poly::stage::MulAssignStage;
use gpu_poly::stage::MulIntoConstStage;
use gpu_poly::stage::MulIntoStage;
use gpu_poly::stage::NegInPlaceStage;
use gpu_poly::stage::NegIntoStage;
use gpu_poly::utils::buffer_no_copy;

pub fn lde_calculator<A: Air>(
    air: &A,
    expr: AlgebraicExpression<A::Fp, A::Fq>,
    hint: &impl Fn(usize) -> FieldConstant<A::Fp, A::Fq>,
    challenge: &impl Fn(usize) -> FieldConstant<A::Fp, A::Fq>,
    trace: &mut impl FnMut(usize) -> EvaluationLde<A::Fp, A::Fq>,
) -> Matrix<A::Fq> {
    use AlgebraicExpression::*;
    let mut expr = expr.reuse_shared_nodes();
    let library = &PLANNER.library;
    let command_queue = &PLANNER.command_queue;
    let device = command_queue.device();
    // constraint evaluation (ce)
    let ce_domain = air.ce_domain();
    let ce_lde_size = ce_domain.size();
    let ce_lde_step = air.ce_blowup_factor();
    let mut lde_cache = LdeCache::<A::Fp, A::Fq>::new(ce_lde_size);

    // temporary data structure for holding trace LDEs
    let mut trace_ldes = BTreeMap::new();

    // substitute LDEs, constants and restructure
    // TODO: expand on this
    expr.traverse_mut(&mut |node| match node {
        Trace(i, j) => {
            let lde = trace_ldes
                .entry(*i)
                .or_insert_with(|| lde_cache.add_buffer(trace(*i)));
            *node = Lde(Rc::clone(lde), *j * ce_lde_step as isize)
        }
        Hint(i) => *node = Constant(hint(*i)),
        Challenge(i) => *node = Constant(challenge(*i)),
        Neg(a) => {
            // TODO: can't make single if statement due to borrowing issues
            let result = if let Constant(a) = *a.borrow() {
                Some(Constant(-a))
            } else {
                None
            };

            if let Some(result) = result {
                *node = result
            }
        }
        Exp(a, e) => {
            let result = if *e == 0 {
                Some(Constant(FieldConstant::Fp(A::Fp::one())))
            } else if let Constant(a) = *a.borrow() {
                let eval = a.pow([e.unsigned_abs() as u64]);
                Some(Constant(if *e >= 0 {
                    eval
                } else {
                    eval.inverse().unwrap()
                }))
            } else {
                None
            };

            if let Some(result) = result {
                *node = result
            }
        }
        X => {
            // there is only one X (since we are reusing shared nodes) so generate an LDE
            // for it TODO: parallelize
            let mut x_lde = Vec::with_capacity_in(ce_domain.size(), PageAlignedAllocator);
            for x in ce_domain.elements() {
                x_lde.push(x);
            }

            let gpu_buffer = buffer_mut_no_copy(device, &mut x_lde);
            let lde = EvaluationLde::Fp(x_lde, gpu_buffer);
            *node = Lde(lde_cache.add_buffer(lde), 0)
        }
        // restructure so Add and Mul evaluation only have to consider children of the form
        // * (Lde() Constant())
        // * (Lde() Lde())
        Add(a, b) => {
            let result = match (&*a.borrow(), &*b.borrow()) {
                (Constant(a), Constant(b)) => Some(Constant(*a + *b)),
                // TODO: look in the morning. This may be problematic
                (Constant(_), _) => Some(Add(Rc::clone(b), Rc::clone(a))),
                _ => None,
            };

            if let Some(result) = result {
                *node = result
            }
        }
        Mul(a, b) => {
            let result = match (&*a.borrow(), &*b.borrow()) {
                (Constant(a), Constant(b)) => Some(Constant(*a * *b)),
                // TODO: look in the morning. This may be problematic
                // TODO: look in the morning. This may be problematic
                (Constant(_), _) => Some(Mul(Rc::clone(b), Rc::clone(a))),
                _ => None,
            };

            if let Some(result) = result {
                *node = result
            }
        }
        Lde(..) | Constant(_) => (/* skip */),
    });

    drop(trace_ldes);

    let command_buffer = command_queue.new_command_buffer();
    let mul_into_const_fp = MulIntoConstStage::<A::Fp>::new(library, ce_lde_size);
    let mul_into_const_fq = MulIntoConstStage::<A::Fq>::new(library, ce_lde_size);
    let mul_into_const_fq_fp = MulIntoConstStage::<A::Fq, A::Fp>::new(library, ce_lde_size);
    let mul_assign_const_fp = MulAssignConstStage::<A::Fp>::new(library, ce_lde_size);
    let mul_assign_const_fq = MulAssignConstStage::<A::Fq>::new(library, ce_lde_size);
    let mul_assign_const_fq_fp = MulAssignConstStage::<A::Fq, A::Fp>::new(library, ce_lde_size);
    let mul_assign_fp = MulAssignStage::<A::Fp>::new(library, ce_lde_size);
    let mul_assign_fq = MulAssignStage::<A::Fq>::new(library, ce_lde_size);
    let mul_assign_fq_fp = MulAssignStage::<A::Fq, A::Fp>::new(library, ce_lde_size);
    let mul_into_fp = MulIntoStage::<A::Fp>::new(library, ce_lde_size);
    let mul_into_fq = MulIntoStage::<A::Fq>::new(library, ce_lde_size);
    let mul_into_fq_fp = MulIntoStage::<A::Fq, A::Fp>::new(library, ce_lde_size);
    let add_assign_fp = AddAssignStage::<A::Fp>::new(library, ce_lde_size);
    let add_assign_fq = AddAssignStage::<A::Fq>::new(library, ce_lde_size);
    let add_assign_fq_fp = AddAssignStage::<A::Fq, A::Fp>::new(library, ce_lde_size);
    let add_into_fp = AddIntoStage::<A::Fp>::new(library, ce_lde_size);
    let add_into_fq = AddIntoStage::<A::Fq>::new(library, ce_lde_size);
    let add_into_fq_fp = AddIntoStage::<A::Fq, A::Fp>::new(library, ce_lde_size);
    let add_into_const_fp = AddIntoConstStage::<A::Fp>::new(library, ce_lde_size);
    let add_into_const_fq = AddIntoConstStage::<A::Fq>::new(library, ce_lde_size);
    let add_into_const_fq_fp = AddIntoConstStage::<A::Fq, A::Fp>::new(library, ce_lde_size);
    let add_assign_const_fp = AddAssignConstStage::<A::Fp>::new(library, ce_lde_size);
    let add_assign_const_fq = AddAssignConstStage::<A::Fq>::new(library, ce_lde_size);
    let add_assign_const_fq_fp = AddAssignConstStage::<A::Fq, A::Fp>::new(library, ce_lde_size);
    // TODO: this is problematic if Fp==Fq
    let convert_fp_into_fq = ConvertIntoStage::<A::Fq, A::Fp>::new(library, ce_lde_size);
    let inverse_in_place_fp = InverseInPlaceStage::<A::Fp>::new(library, ce_lde_size);
    // let inverse_into_fp = InverseIntoStage::<A::Fp>::new(library, ce_lde_size);
    let neg_in_place_fp = NegInPlaceStage::<A::Fp>::new(library, ce_lde_size);
    let neg_in_place_fq = NegInPlaceStage::<A::Fq>::new(library, ce_lde_size);
    let neg_into_fp = NegIntoStage::<A::Fp>::new(library, ce_lde_size);
    let neg_into_fq = NegIntoStage::<A::Fq>::new(library, ce_lde_size);
    let exp_in_place_fp = ExpInPlaceStage::<A::Fp>::new(library, ce_lde_size);
    let exp_into_fp = ExpIntoStage::<A::Fp>::new(library, ce_lde_size);

    // evaluate the constraints
    let ce_lde_size = ce_lde_size as isize;
    expr.traverse_mut(&mut |node| match node {
        // evaluate tree nodes
        // Add and Mul only have to consider children of the form
        // * (Lde() Constant())
        // * (Lde() Lde())
        Add(a, b) => {
            let a_ref_count = Rc::strong_count(a);
            let b_ref_count = Rc::strong_count(b);
            let result = match (&*a.borrow(), &*b.borrow()) {
                (Lde(lde, buff_offset), Constant(FieldConstant::Fp(c))) => {
                    // TODO: allow Fp constants so Fp or Fq buffers can be used
                    // TODO: fix. 2 for reference in eval_buffers
                    Lde(
                        match lde.as_ref() {
                            EvaluationLde::Fp(_, buff) => {
                                if a_ref_count == 1 && Rc::strong_count(lde) <= 2 {
                                    add_assign_const_fp.encode(command_buffer, buff, c);
                                    Rc::clone(lde)
                                } else {
                                    let dst = lde_cache.get_buffer(FieldType::Fp);
                                    add_into_const_fp.encode(
                                        command_buffer,
                                        dst.get_gpu_buffer(),
                                        buff,
                                        *c,
                                    );
                                    dst
                                }
                            }
                            EvaluationLde::Fq(_, buff) => {
                                if a_ref_count == 1 && Rc::strong_count(lde) <= 2 {
                                    add_assign_const_fq_fp.encode(command_buffer, buff, c);
                                    Rc::clone(lde)
                                } else {
                                    let dst = lde_cache.get_buffer(FieldType::Fq);
                                    add_into_const_fq_fp.encode(
                                        command_buffer,
                                        dst.get_gpu_buffer(),
                                        buff,
                                        *c,
                                    );
                                    dst
                                }
                            }
                        },
                        *buff_offset,
                    )
                }
                (Lde(lde, buff_offset), Constant(FieldConstant::Fq(c))) => {
                    // TODO: allow Fp constants so Fp or Fq buffers can be used
                    // TODO: fix. 2 for reference in eval_buffers
                    Lde(
                        match lde.as_ref() {
                            EvaluationLde::Fp(_, buff) => {
                                let dst = lde_cache.get_buffer(FieldType::Fq);
                                convert_fp_into_fq.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    buff,
                                );
                                add_assign_const_fq.encode(command_buffer, dst.get_gpu_buffer(), c);
                                dst
                            }
                            EvaluationLde::Fq(_, buff) => {
                                if a_ref_count == 1 && Rc::strong_count(lde) <= 2 {
                                    add_assign_const_fq.encode(command_buffer, buff, c);
                                    Rc::clone(lde)
                                } else {
                                    let dst = lde_cache.get_buffer(FieldType::Fq);
                                    add_into_const_fq.encode(
                                        command_buffer,
                                        dst.get_gpu_buffer(),
                                        buff,
                                        *c,
                                    );
                                    dst
                                }
                            }
                        },
                        *buff_offset,
                    )
                }
                (Lde(lhs, lhs_offset), Lde(rhs, rhs_offset)) => {
                    let lhs_offset = lhs_offset % ce_lde_size;
                    let rhs_offset = rhs_offset % ce_lde_size;
                    match (lhs.as_ref(), rhs.as_ref()) {
                        (EvaluationLde::Fp(_, lhs_buff), EvaluationLde::Fp(_, rhs_buff)) => {
                            if a_ref_count == 1 && Rc::strong_count(lhs) <= 2 {
                                // TODO: offsets
                                let offset_diff = rhs_offset - lhs_offset;
                                add_assign_fp.encode(
                                    command_buffer,
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(lhs), rhs_offset - offset_diff)
                            } else if b_ref_count == 1 && Rc::strong_count(rhs) <= 2 {
                                let offset_diff = lhs_offset - rhs_offset;
                                add_assign_fp.encode(
                                    command_buffer,
                                    rhs_buff,
                                    lhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(rhs), lhs_offset - offset_diff)
                            } else {
                                let dst = lde_cache.get_buffer(FieldType::Fp);
                                let offset_diff = rhs_offset - lhs_offset;
                                add_into_fp.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(dst, rhs_offset - offset_diff)
                            }
                        }
                        (EvaluationLde::Fq(_, lhs_buff), EvaluationLde::Fq(_, rhs_buff)) => {
                            if a_ref_count == 1 && Rc::strong_count(lhs) <= 2 {
                                // TODO: offsets
                                let offset_diff = rhs_offset - lhs_offset;
                                add_assign_fq.encode(
                                    command_buffer,
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(lhs), rhs_offset - offset_diff)
                            } else if b_ref_count == 1 && Rc::strong_count(rhs) <= 2 {
                                let offset_diff = lhs_offset - rhs_offset;
                                add_assign_fq.encode(
                                    command_buffer,
                                    rhs_buff,
                                    lhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(rhs), lhs_offset - offset_diff)
                            } else {
                                let dst = lde_cache.get_buffer(FieldType::Fq);
                                let offset_diff = rhs_offset - lhs_offset;
                                add_into_fq.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(dst, rhs_offset - offset_diff)
                            }
                        }
                        (EvaluationLde::Fp(_, lhs_buff), EvaluationLde::Fq(_, rhs_buff)) => {
                            if b_ref_count == 1 && Rc::strong_count(rhs) <= 2 {
                                let offset_diff = lhs_offset - rhs_offset;
                                add_assign_fq_fp.encode(
                                    command_buffer,
                                    rhs_buff,
                                    lhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(rhs), lhs_offset - offset_diff)
                            } else {
                                let dst = lde_cache.get_buffer(FieldType::Fq);
                                let offset_diff = lhs_offset - rhs_offset;
                                add_into_fq_fp.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    rhs_buff,
                                    lhs_buff,
                                    offset_diff,
                                );
                                Lde(dst, lhs_offset - offset_diff)
                            }
                        }
                        (EvaluationLde::Fq(_, lhs_buff), EvaluationLde::Fp(_, rhs_buff)) => {
                            if a_ref_count == 1 && Rc::strong_count(lhs) <= 2 {
                                let offset_diff = rhs_offset - lhs_offset;
                                add_assign_fq_fp.encode(
                                    command_buffer,
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(lhs), rhs_offset - offset_diff)
                            } else {
                                let dst = lde_cache.get_buffer(FieldType::Fq);
                                let offset_diff = rhs_offset - lhs_offset;
                                add_into_fq_fp.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(dst, rhs_offset - offset_diff)
                            }
                        }
                    }
                }
                _ => unreachable!(),
            };
            *node = result;
        }

        Mul(a, b) => {
            let a_ref_count = Rc::strong_count(a);
            let b_ref_count = Rc::strong_count(b);
            let result = match (&*a.borrow(), &*b.borrow()) {
                (Lde(lde, buff_offset), Constant(FieldConstant::Fp(c))) => {
                    // TODO: allow Fp constants so Fp or Fq buffers can be used
                    // TODO: fix. 2 for reference in eval_buffers
                    Lde(
                        match lde.as_ref() {
                            EvaluationLde::Fp(_, buff) => {
                                if a_ref_count == 1 && Rc::strong_count(lde) <= 2 {
                                    mul_assign_const_fp.encode(command_buffer, buff, *c);
                                    Rc::clone(lde)
                                } else {
                                    let dst = lde_cache.get_buffer(FieldType::Fp);
                                    mul_into_const_fp.encode(
                                        command_buffer,
                                        dst.get_gpu_buffer(),
                                        buff,
                                        c,
                                    );
                                    dst
                                }
                            }
                            EvaluationLde::Fq(_, buff) => {
                                if a_ref_count == 1 && Rc::strong_count(lde) <= 2 {
                                    mul_assign_const_fq_fp.encode(command_buffer, buff, *c);
                                    Rc::clone(lde)
                                } else {
                                    let dst = lde_cache.get_buffer(FieldType::Fq);
                                    mul_into_const_fq_fp.encode(
                                        command_buffer,
                                        dst.get_gpu_buffer(),
                                        buff,
                                        c,
                                    );
                                    dst
                                }
                            }
                        },
                        *buff_offset,
                    )
                }
                (Lde(lde, buff_offset), Constant(FieldConstant::Fq(c))) => {
                    // TODO: allow Fp constants so Fp or Fq buffers can be used
                    // TODO: fix. 2 for reference in eval_buffers
                    Lde(
                        match lde.as_ref() {
                            EvaluationLde::Fp(_, buff) => {
                                let dst = lde_cache.get_buffer(FieldType::Fq);
                                convert_fp_into_fq.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    buff,
                                );
                                mul_assign_const_fq.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    *c,
                                );
                                dst
                            }
                            EvaluationLde::Fq(_, buff) => {
                                if a_ref_count == 1 && Rc::strong_count(lde) <= 2 {
                                    mul_assign_const_fq.encode(command_buffer, buff, *c);
                                    Rc::clone(lde)
                                } else {
                                    let dst = lde_cache.get_buffer(FieldType::Fq);
                                    mul_into_const_fq.encode(
                                        command_buffer,
                                        dst.get_gpu_buffer(),
                                        buff,
                                        c,
                                    );
                                    dst
                                }
                            }
                        },
                        *buff_offset,
                    )
                }
                (Lde(lhs, lhs_offset), Lde(rhs, rhs_offset)) => {
                    let lhs_offset = lhs_offset % ce_lde_size;
                    let rhs_offset = rhs_offset % ce_lde_size;
                    match (lhs.as_ref(), rhs.as_ref()) {
                        (EvaluationLde::Fp(_, lhs_buff), EvaluationLde::Fp(_, rhs_buff)) => {
                            if a_ref_count == 1 && Rc::strong_count(lhs) <= 2 {
                                // TODO: offsets
                                let offset_diff = rhs_offset - lhs_offset;
                                mul_assign_fp.encode(
                                    command_buffer,
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(lhs), rhs_offset - offset_diff)
                            } else if b_ref_count == 1 && Rc::strong_count(rhs) <= 2 {
                                let offset_diff = lhs_offset - rhs_offset;
                                mul_assign_fp.encode(
                                    command_buffer,
                                    rhs_buff,
                                    lhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(rhs), lhs_offset - offset_diff)
                            } else {
                                let dst = lde_cache.get_buffer(FieldType::Fp);
                                let offset_diff = rhs_offset - lhs_offset;
                                mul_into_fp.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(dst, rhs_offset - offset_diff)
                            }
                        }
                        (EvaluationLde::Fq(_, lhs_buff), EvaluationLde::Fq(_, rhs_buff)) => {
                            if a_ref_count == 1 && Rc::strong_count(lhs) <= 2 {
                                // TODO: offsets
                                let offset_diff = rhs_offset - lhs_offset;
                                mul_assign_fq.encode(
                                    command_buffer,
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(lhs), rhs_offset - offset_diff)
                            } else if b_ref_count == 1 && Rc::strong_count(rhs) <= 2 {
                                let offset_diff = lhs_offset - rhs_offset;
                                mul_assign_fq.encode(
                                    command_buffer,
                                    rhs_buff,
                                    lhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(rhs), lhs_offset - offset_diff)
                            } else {
                                let dst = lde_cache.get_buffer(FieldType::Fq);
                                let offset_diff = rhs_offset - lhs_offset;
                                mul_into_fq.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(dst, rhs_offset - offset_diff)
                            }
                        }
                        (EvaluationLde::Fp(_, lhs_buff), EvaluationLde::Fq(_, rhs_buff)) => {
                            if b_ref_count == 1 && Rc::strong_count(rhs) <= 2 {
                                let offset_diff = lhs_offset - rhs_offset;
                                mul_assign_fq_fp.encode(
                                    command_buffer,
                                    rhs_buff,
                                    lhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(rhs), lhs_offset - offset_diff)
                            } else {
                                let dst = lde_cache.get_buffer(FieldType::Fq);
                                let offset_diff = lhs_offset - rhs_offset;
                                mul_into_fq_fp.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    rhs_buff,
                                    lhs_buff,
                                    offset_diff,
                                );
                                Lde(dst, lhs_offset - offset_diff)
                            }
                        }
                        (EvaluationLde::Fq(_, lhs_buff), EvaluationLde::Fp(_, rhs_buff)) => {
                            if a_ref_count == 1 && Rc::strong_count(lhs) <= 2 {
                                let offset_diff = rhs_offset - lhs_offset;
                                mul_assign_fq_fp.encode(
                                    command_buffer,
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(Rc::clone(lhs), rhs_offset - offset_diff)
                            } else {
                                let dst = lde_cache.get_buffer(FieldType::Fq);
                                let offset_diff = rhs_offset - lhs_offset;
                                mul_into_fq_fp.encode(
                                    command_buffer,
                                    dst.get_gpu_buffer(),
                                    lhs_buff,
                                    rhs_buff,
                                    offset_diff,
                                );
                                Lde(dst, rhs_offset - offset_diff)
                            }
                        }
                    }
                }
                _ => unreachable!(),
            };
            *node = result;
        }

        Neg(a) => {
            let a_ref_count = Rc::strong_count(a);
            // TODO: performance combine this into multiplication/addition
            let result = match &*a.borrow() {
                Lde(lde, buff_offset) => match lde.as_ref() {
                    EvaluationLde::Fp(_, buff) => {
                        if a_ref_count == 1 && Rc::strong_count(lde) <= 2 {
                            neg_in_place_fp.encode(command_buffer, buff);
                            Lde(Rc::clone(lde), *buff_offset)
                        } else {
                            let dst = lde_cache.get_buffer(FieldType::Fp);
                            neg_into_fp.encode(command_buffer, dst.get_gpu_buffer(), buff);
                            Lde(dst, *buff_offset)
                        }
                    }
                    EvaluationLde::Fq(_, buff) => {
                        if a_ref_count == 1 && Rc::strong_count(lde) <= 2 {
                            // neg_in_place(buff.as_ref())
                            neg_in_place_fq.encode(command_buffer, buff);
                            Lde(Rc::clone(lde), *buff_offset)
                        } else {
                            let dst = lde_cache.get_buffer(FieldType::Fq);
                            neg_into_fq.encode(command_buffer, dst.get_gpu_buffer(), buff);
                            Lde(dst, *buff_offset)
                        }
                    }
                },
                _ => unreachable!(),
            };
            *node = result;
        }

        Exp(a, e) => {
            let a_ref_count = Rc::strong_count(a);
            // TODO: performance combine this into multiplication/addition
            let result = match &*a.borrow() {
                Lde(lde, buff_offset) => match lde.as_ref() {
                    EvaluationLde::Fp(_, buff) => {
                        if a_ref_count == 1 && Rc::strong_count(lde) <= 2 {
                            exp_in_place_fp.encode(command_buffer, buff, e.unsigned_abs());
                            if *e < 0 {
                                inverse_in_place_fp.encode(command_buffer, buff);
                            }
                            Lde(Rc::clone(lde), *buff_offset)
                        } else {
                            let dst = lde_cache.get_buffer(FieldType::Fp);
                            exp_into_fp.encode(
                                command_buffer,
                                dst.get_gpu_buffer(),
                                buff,
                                e.unsigned_abs(),
                            );
                            if *e < 0 {
                                inverse_in_place_fp.encode(command_buffer, dst.get_gpu_buffer());
                            }
                            Lde(dst, *buff_offset)
                        }
                    }
                    EvaluationLde::Fq(_, _buff) => todo!(),
                },
                _ => unreachable!(),
            };
            *node = result;
        }

        // skip
        Lde(..) => (),
        Constant(_) => (),

        // trace, hint and challenge have been substituted
        _ => panic!(),
    });

    // TODO: this is bad if only needs Fp
    // TODO: this should never be done
    if let Lde(lde, offset) = &mut expr {
        let result = match lde.as_ref() {
            EvaluationLde::Fp(_, buff) => {
                let dst = lde_cache.get_buffer(FieldType::Fq);
                convert_fp_into_fq.encode(command_buffer, dst.get_gpu_buffer(), buff);
                Lde(dst, *offset)
            }
            _ => Lde(Rc::clone(lde), *offset),
        };
        expr = result;
    } else {
        unreachable!()
    }

    command_buffer.commit();
    command_buffer.wait_until_completed();
    drop(lde_cache);

    if let Lde(buff, offset) = expr {
        assert_eq!(offset, 0);
        match Rc::try_unwrap(buff).unwrap() {
            EvaluationLde::Fp(_, _) => unreachable!(),
            EvaluationLde::Fq(res, _) => Matrix::new(vec![res]),
        }
    } else {
        unreachable!()
    }
}

pub struct LdeCache<Fp, Fq> {
    // TODO: make a type for vec and gpu buffer
    lde_size: usize,
    buffers: Vec<Rc<EvaluationLde<Fp, Fq>>>,
}

impl<Fp: GpuField, Fq: GpuField> LdeCache<Fp, Fq> {
    fn new(lde_size: usize) -> Self {
        LdeCache {
            lde_size,
            buffers: Vec::new(),
        }
    }

    fn add_buffer(&mut self, lde: EvaluationLde<Fp, Fq>) -> Rc<EvaluationLde<Fp, Fq>> {
        let res = Rc::new(lde);
        self.buffers.push(Rc::clone(&res));
        res
    }

    fn get_buffer(&mut self, ty: FieldType) -> Rc<EvaluationLde<Fp, Fq>> {
        let command_queue = &PLANNER.command_queue;
        let device = command_queue.device();
        // TODO: make O(1)
        self.buffers
            .iter()
            .find_map(|lde| {
                if Rc::strong_count(lde) == 1 {
                    match (lde.as_ref(), ty) {
                        (EvaluationLde::Fp(..), FieldType::Fp)
                        | (EvaluationLde::Fq(..), FieldType::Fq) => Some(Rc::clone(lde)),
                        _ => None,
                    }
                } else {
                    None
                }
            })
            .unwrap_or_else(|| {
                // if a buffer can't be found in the pool allocate new memory
                let n = self.lde_size;
                let buffer = match ty {
                    FieldType::Fp => {
                        let mut buffer = GpuVec::<Fp>::with_capacity_in(n, PageAlignedAllocator);
                        // ok because all buffers are treated as uninitialized
                        unsafe { buffer.set_len(n) }
                        let gpu_buffer = buffer_no_copy(device, &buffer);
                        EvaluationLde::Fp(buffer, gpu_buffer)
                    }
                    FieldType::Fq => {
                        let mut buffer = GpuVec::<Fq>::with_capacity_in(n, PageAlignedAllocator);
                        // ok because all buffers are treated as uninitialized
                        unsafe { buffer.set_len(n) }
                        let gpu_buffer = buffer_no_copy(device, &buffer);
                        EvaluationLde::Fq(buffer, gpu_buffer)
                    }
                };

                let res = Rc::new(buffer);
                self.buffers.push(Rc::clone(&res));
                res
            })
    }
}
