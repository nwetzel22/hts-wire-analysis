/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWire = /* GraphQL */ `
  mutation CreateWire(
    $input: CreateWireInput!
    $condition: ModelWireConditionInput
  ) {
    createWire(input: $input, condition: $condition) {
      id
      title
      date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateWire = /* GraphQL */ `
  mutation UpdateWire(
    $input: UpdateWireInput!
    $condition: ModelWireConditionInput
  ) {
    updateWire(input: $input, condition: $condition) {
      id
      title
      date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteWire = /* GraphQL */ `
  mutation DeleteWire(
    $input: DeleteWireInput!
    $condition: ModelWireConditionInput
  ) {
    deleteWire(input: $input, condition: $condition) {
      id
      title
      date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
