import { InternalListener, Operator, Stream } from '../index';
export interface SampleCombineSignature {
    (): <T>(s: Stream<T>) => Stream<[T]>;
    <T1>(s1: Stream<T1>): <T>(s: Stream<T>) => Stream<[T, T1]>;
    <T1, T2>(s1: Stream<T1>, s2: Stream<T2>): <T>(s: Stream<T>) => Stream<[T, T1, T2]>;
    <T1, T2, T3>(s1: Stream<T1>, s2: Stream<T2>, s3: Stream<T3>): <T>(s: Stream<T>) => Stream<[T, T1, T2, T3]>;
    <T1, T2, T3, T4>(s1: Stream<T1>, s2: Stream<T2>, s3: Stream<T3>, s4: Stream<T4>): <T>(s: Stream<T>) => Stream<[T, T1, T2, T3, T4]>;
    <T1, T2, T3, T4, T5>(s1: Stream<T1>, s2: Stream<T2>, s3: Stream<T3>, s4: Stream<T4>, s5: Stream<T5>): <T>(s: Stream<T>) => Stream<[T, T1, T2, T3, T4, T5]>;
    <T1, T2, T3, T4, T5, T6>(s1: Stream<T1>, s2: Stream<T2>, s3: Stream<T3>, s4: Stream<T4>, s5: Stream<T5>, s6: Stream<T6>): <T>(s: Stream<T>) => Stream<[T, T1, T2, T3, T4, T5, T6]>;
    <T1, T2, T3, T4, T5, T6, T7>(s1: Stream<T1>, s2: Stream<T2>, s3: Stream<T3>, s4: Stream<T4>, s5: Stream<T5>, s6: Stream<T6>, s7: Stream<T7>): <T>(s: Stream<T>) => Stream<[T, T1, T2, T3, T4, T5, T6, T7]>;
    <T1, T2, T3, T4, T5, T6, T7, T8>(s1: Stream<T1>, s2: Stream<T2>, s3: Stream<T3>, s4: Stream<T4>, s5: Stream<T5>, s6: Stream<T6>, s7: Stream<T7>, s8: Stream<T8>): <T>(s: Stream<T>) => Stream<[T, T1, T2, T3, T4, T5, T6, T7, T8]>;
    (...streams: Array<Stream<any>>): (s: Stream<any>) => Stream<Array<any>>;
}
export declare class SampleCombineListener<T> implements InternalListener<T> {
    private i;
    private p;
    constructor(i: number, p: SampleCombineOperator<any>);
    _n(t: T): void;
    _e(err: any): void;
    _c(): void;
}
export declare class SampleCombineOperator<T> implements Operator<T, Array<any>> {
    type: string;
    ins: Stream<T>;
    others: Array<Stream<any>>;
    out: Stream<Array<any>>;
    ils: Array<SampleCombineListener<any>>;
    Nn: number;
    vals: Array<any>;
    constructor(ins: Stream<T>, streams: Array<Stream<any>>);
    _start(out: Stream<Array<any>>): void;
    _stop(): void;
    _n(t: T): void;
    _e(err: any): void;
    _c(): void;
    up(t: any, i: number): void;
    down(i: number, l: SampleCombineListener<any>): void;
}
declare let sampleCombine: SampleCombineSignature;
export default sampleCombine;
