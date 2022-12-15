/// <reference types="node" />
import { EventEmitter } from 'events';
import { Stream, InternalProducer, InternalListener } from '../index';
export declare class DOMEventProducer implements InternalProducer<Event> {
    private node;
    private eventType;
    private useCapture;
    type: string;
    private listener?;
    constructor(node: EventTarget, eventType: string, useCapture: boolean);
    _start(out: InternalListener<Event>): void;
    _stop(): void;
}
export declare class NodeEventProducer implements InternalProducer<any> {
    private node;
    private eventName;
    type: string;
    private listener?;
    constructor(node: EventEmitter, eventName: string);
    _start(out: InternalListener<any>): void;
    _stop(): void;
}
declare function fromEvent<T = any>(element: EventEmitter, eventName: string): Stream<T>;
declare function fromEvent<T extends Event = Event>(element: EventTarget, eventName: string, useCapture?: boolean): Stream<T>;
export default fromEvent;
