import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerWire = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Wire, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyWire = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Wire, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Wire = LazyLoading extends LazyLoadingDisabled ? EagerWire : LazyWire

export declare const Wire: (new (init: ModelInit<Wire>) => Wire) & {
  copyOf(source: Wire, mutator: (draft: MutableModel<Wire>) => MutableModel<Wire> | void): Wire;
}