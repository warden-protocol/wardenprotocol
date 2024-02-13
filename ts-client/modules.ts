import { IgniteClient } from "./client";
import { GeneratedType } from "@cosmjs/proto-signing";

export type IgntModuleInterface = { [key: string]: any }
export type IgntModule = (instance: IgniteClient) => { module: IgntModuleInterface, registry: [string, GeneratedType][] }
