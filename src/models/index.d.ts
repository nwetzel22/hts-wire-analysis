import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerWireSample = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WireSample, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWireSample = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<WireSample, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type WireSample = LazyLoading extends LazyLoadingDisabled ? EagerWireSample : LazyWireSample

export declare const WireSample: (new (init: ModelInit<WireSample>) => WireSample) & {
  copyOf(source: WireSample, mutator: (draft: MutableModel<WireSample>) => MutableModel<WireSample> | void): WireSample;
}