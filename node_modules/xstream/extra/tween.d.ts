import { Stream } from '../index';
export declare type Ease = (x: number, from: number, to: number) => number;
export declare type Easings = {
    easeIn: Ease;
    easeOut: Ease;
    easeInOut: Ease;
};
export declare type NumericFunction = (input: number) => number;
export interface TweenConfig {
    from: number;
    to: number;
    duration: number;
    ease?: Ease;
    interval?: number;
}
export interface TweenFactory {
    (config: TweenConfig): Stream<number>;
    linear: {
        ease: Ease;
    };
    power2: Easings;
    power3: Easings;
    power4: Easings;
    exponential: Easings;
    back: Easings;
    bounce: Easings;
    circular: Easings;
    elastic: Easings;
    sine: Easings;
}
declare const tweenFactory: TweenFactory;
export default tweenFactory;
