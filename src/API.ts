/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateWireInput = {
  id?: string | null,
  title: string,
  date: string,
  _version?: number | null,
};

export type ModelWireConditionInput = {
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelWireConditionInput | null > | null,
  or?: Array< ModelWireConditionInput | null > | null,
  not?: ModelWireConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Wire = {
  __typename: "Wire",
  id: string,
  title: string,
  date: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateWireInput = {
  id: string,
  title?: string | null,
  date?: string | null,
  _version?: number | null,
};

export type DeleteWireInput = {
  id: string,
  _version?: number | null,
};

export type ModelWireFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelWireFilterInput | null > | null,
  or?: Array< ModelWireFilterInput | null > | null,
  not?: ModelWireFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelWireConnection = {
  __typename: "ModelWireConnection",
  items:  Array<Wire | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionWireFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionWireFilterInput | null > | null,
  or?: Array< ModelSubscriptionWireFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateWireMutationVariables = {
  input: CreateWireInput,
  condition?: ModelWireConditionInput | null,
};

export type CreateWireMutation = {
  createWire?:  {
    __typename: "Wire",
    id: string,
    title: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateWireMutationVariables = {
  input: UpdateWireInput,
  condition?: ModelWireConditionInput | null,
};

export type UpdateWireMutation = {
  updateWire?:  {
    __typename: "Wire",
    id: string,
    title: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteWireMutationVariables = {
  input: DeleteWireInput,
  condition?: ModelWireConditionInput | null,
};

export type DeleteWireMutation = {
  deleteWire?:  {
    __typename: "Wire",
    id: string,
    title: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetWireQueryVariables = {
  id: string,
};

export type GetWireQuery = {
  getWire?:  {
    __typename: "Wire",
    id: string,
    title: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListWiresQueryVariables = {
  filter?: ModelWireFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWiresQuery = {
  listWires?:  {
    __typename: "ModelWireConnection",
    items:  Array< {
      __typename: "Wire",
      id: string,
      title: string,
      date: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncWiresQueryVariables = {
  filter?: ModelWireFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncWiresQuery = {
  syncWires?:  {
    __typename: "ModelWireConnection",
    items:  Array< {
      __typename: "Wire",
      id: string,
      title: string,
      date: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateWireSubscriptionVariables = {
  filter?: ModelSubscriptionWireFilterInput | null,
};

export type OnCreateWireSubscription = {
  onCreateWire?:  {
    __typename: "Wire",
    id: string,
    title: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateWireSubscriptionVariables = {
  filter?: ModelSubscriptionWireFilterInput | null,
};

export type OnUpdateWireSubscription = {
  onUpdateWire?:  {
    __typename: "Wire",
    id: string,
    title: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteWireSubscriptionVariables = {
  filter?: ModelSubscriptionWireFilterInput | null,
};

export type OnDeleteWireSubscription = {
  onDeleteWire?:  {
    __typename: "Wire",
    id: string,
    title: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
