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
  locationTurnedIn?: string | null;
  timeFound?: string | null;
}

export interface GetUserSettingsData {
  user?: {
    emailNotification: boolean;
  };
}

export interface Item_Key {
  id: UUIDString;
  __typename?: 'Item_Key';
}

export interface ListFoundItemsData {
  items: ({
    id: UUIDString;
    itemName: string;
    description?: string | null;
    location?: string | null;
    imageLink?: string | null;
    category?: string | null;
    lostStatus: boolean;
    locationTurnedIn?: string | null;
    timeFound?: string | null;
  } & Item_Key)[];
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
    createdAt: TimestampString;
    user: {
      id: string;
      username: string;
      email: string;
      photoUrl?: string | null;
    } & User_Key;
  } & Item_Key)[];
}

export interface ListUserFoundItemsData {
  items: ({
    id: UUIDString;
    itemName: string;
    description?: string | null;
    location?: string | null;
    imageLink?: string | null;
    category?: string | null;
    lostStatus: boolean;
    locationTurnedIn?: string | null;
    timeFound?: string | null;
  } & Item_Key)[];
}

export interface SearchFoundItemsData {
  items: ({
    id: UUIDString;
    itemName: string;
    description?: string | null;
    location?: string | null;
    imageLink?: string | null;
    category?: string | null;
    lostStatus: boolean;
    locationTurnedIn?: string | null;
    timeFound?: string | null;
  } & Item_Key)[];
}

export interface SearchFoundItemsVariables {
  location?: string | null;
  category?: string | null;
}

export interface UpdateEmailNotificationData {
  user_upsert: User_Key;
}

export interface UpdateEmailNotificationVariables {
  enabled: boolean;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  username: string;
  email: string;
  photoUrl?: string | null;
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

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpdateEmailNotificationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEmailNotificationVariables): MutationRef<UpdateEmailNotificationData, UpdateEmailNotificationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEmailNotificationVariables): MutationRef<UpdateEmailNotificationData, UpdateEmailNotificationVariables>;
  operationName: string;
}
export const updateEmailNotificationRef: UpdateEmailNotificationRef;

export function updateEmailNotification(vars: UpdateEmailNotificationVariables): MutationPromise<UpdateEmailNotificationData, UpdateEmailNotificationVariables>;
export function updateEmailNotification(dc: DataConnect, vars: UpdateEmailNotificationVariables): MutationPromise<UpdateEmailNotificationData, UpdateEmailNotificationVariables>;

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

interface ListUserFoundItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserFoundItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserFoundItemsData, undefined>;
  operationName: string;
}
export const listUserFoundItemsRef: ListUserFoundItemsRef;

export function listUserFoundItems(options?: ExecuteQueryOptions): QueryPromise<ListUserFoundItemsData, undefined>;
export function listUserFoundItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserFoundItemsData, undefined>;

interface ListFoundItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFoundItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListFoundItemsData, undefined>;
  operationName: string;
}
export const listFoundItemsRef: ListFoundItemsRef;

export function listFoundItems(options?: ExecuteQueryOptions): QueryPromise<ListFoundItemsData, undefined>;
export function listFoundItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFoundItemsData, undefined>;

interface SearchFoundItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchFoundItemsVariables): QueryRef<SearchFoundItemsData, SearchFoundItemsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: SearchFoundItemsVariables): QueryRef<SearchFoundItemsData, SearchFoundItemsVariables>;
  operationName: string;
}
export const searchFoundItemsRef: SearchFoundItemsRef;

export function searchFoundItems(vars?: SearchFoundItemsVariables, options?: ExecuteQueryOptions): QueryPromise<SearchFoundItemsData, SearchFoundItemsVariables>;
export function searchFoundItems(dc: DataConnect, vars?: SearchFoundItemsVariables, options?: ExecuteQueryOptions): QueryPromise<SearchFoundItemsData, SearchFoundItemsVariables>;

interface GetUserSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserSettingsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserSettingsData, undefined>;
  operationName: string;
}
export const getUserSettingsRef: GetUserSettingsRef;

export function getUserSettings(options?: ExecuteQueryOptions): QueryPromise<GetUserSettingsData, undefined>;
export function getUserSettings(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserSettingsData, undefined>;

