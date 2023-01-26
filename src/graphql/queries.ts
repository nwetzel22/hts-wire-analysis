/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWire = /* GraphQL */ `
  query GetWire($id: ID!) {
    getWire(id: $id) {
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
export const listWires = /* GraphQL */ `
  query ListWires(
    $filter: ModelWireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWires(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWires = /* GraphQL */ `
  query SyncWires(
    $filter: ModelWireFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWires(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
