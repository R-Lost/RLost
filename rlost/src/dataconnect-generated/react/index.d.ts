import { CreateItemData, CreateItemVariables, UpsertUserData, UpsertUserVariables, UpdateEmailNotificationData, UpdateEmailNotificationVariables, ListLostItemsData, ListUserFoundItemsData, ListFoundItemsData, SearchFoundItemsData, SearchFoundItemsVariables, GetUserSettingsData, GetUserSettingsVariables, ListOptInLostItemsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateItem(options?: useDataConnectMutationOptions<CreateItemData, FirebaseError, CreateItemVariables>): UseDataConnectMutationResult<CreateItemData, CreateItemVariables>;
export function useCreateItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateItemData, FirebaseError, CreateItemVariables>): UseDataConnectMutationResult<CreateItemData, CreateItemVariables>;

export function useUpsertUser(options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;
export function useUpsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;

export function useUpdateEmailNotification(options?: useDataConnectMutationOptions<UpdateEmailNotificationData, FirebaseError, UpdateEmailNotificationVariables>): UseDataConnectMutationResult<UpdateEmailNotificationData, UpdateEmailNotificationVariables>;
export function useUpdateEmailNotification(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEmailNotificationData, FirebaseError, UpdateEmailNotificationVariables>): UseDataConnectMutationResult<UpdateEmailNotificationData, UpdateEmailNotificationVariables>;

export function useListLostItems(options?: useDataConnectQueryOptions<ListLostItemsData>): UseDataConnectQueryResult<ListLostItemsData, undefined>;
export function useListLostItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListLostItemsData>): UseDataConnectQueryResult<ListLostItemsData, undefined>;

export function useListUserFoundItems(options?: useDataConnectQueryOptions<ListUserFoundItemsData>): UseDataConnectQueryResult<ListUserFoundItemsData, undefined>;
export function useListUserFoundItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserFoundItemsData>): UseDataConnectQueryResult<ListUserFoundItemsData, undefined>;

export function useListFoundItems(options?: useDataConnectQueryOptions<ListFoundItemsData>): UseDataConnectQueryResult<ListFoundItemsData, undefined>;
export function useListFoundItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListFoundItemsData>): UseDataConnectQueryResult<ListFoundItemsData, undefined>;

export function useSearchFoundItems(vars?: SearchFoundItemsVariables, options?: useDataConnectQueryOptions<SearchFoundItemsData>): UseDataConnectQueryResult<SearchFoundItemsData, SearchFoundItemsVariables>;
export function useSearchFoundItems(dc: DataConnect, vars?: SearchFoundItemsVariables, options?: useDataConnectQueryOptions<SearchFoundItemsData>): UseDataConnectQueryResult<SearchFoundItemsData, SearchFoundItemsVariables>;

export function useGetUserSettings(vars?: GetUserSettingsVariables, options?: useDataConnectQueryOptions<GetUserSettingsData>): UseDataConnectQueryResult<GetUserSettingsData, GetUserSettingsVariables>;
export function useGetUserSettings(dc: DataConnect, vars?: GetUserSettingsVariables, options?: useDataConnectQueryOptions<GetUserSettingsData>): UseDataConnectQueryResult<GetUserSettingsData, GetUserSettingsVariables>;

export function useListOptInLostItems(options?: useDataConnectQueryOptions<ListOptInLostItemsData>): UseDataConnectQueryResult<ListOptInLostItemsData, undefined>;
export function useListOptInLostItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListOptInLostItemsData>): UseDataConnectQueryResult<ListOptInLostItemsData, undefined>;
