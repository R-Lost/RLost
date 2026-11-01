import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateItemData {
  item_insert: Item_Key;
}

export interface CreateItemVariables {
  itemName: string;
  description?: string | null;
  location?: string | null;
  imageLink?: string | null;
  category?: string | null;
  lostStatus: boolean;
}

export interface Item_Key {
  id: UUIDString;
  __typename?: 'Item_Key';
}

export interface ListLostItemsData {
  items: ({
    id: UUIDString;
    itemName: string;
    description?: string | null;
    location?: string | null;
    imageLink?: string | null;
    category?: string | null;
    lostStatus: boolean;
  } & Item_Key)[];
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface CreateItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
  operationName: string;
}
export const createItemRef: CreateItemRef;

export function createItem(vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;
export function createItem(dc: DataConnect, vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

interface ListLostItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLostItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListLostItemsData, undefined>;
  operationName: string;
}
export const listLostItemsRef: ListLostItemsRef;

export function listLostItems(options?: ExecuteQueryOptions): QueryPromise<ListLostItemsData, undefined>;
export function listLostItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLostItemsData, undefined>;

