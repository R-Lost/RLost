import { CreateItemData, CreateItemVariables, ListLostItemsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateItem(options?: useDataConnectMutationOptions<CreateItemData, FirebaseError, CreateItemVariables>): UseDataConnectMutationResult<CreateItemData, CreateItemVariables>;
export function useCreateItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateItemData, FirebaseError, CreateItemVariables>): UseDataConnectMutationResult<CreateItemData, CreateItemVariables>;

export function useListLostItems(options?: useDataConnectQueryOptions<ListLostItemsData>): UseDataConnectQueryResult<ListLostItemsData, undefined>;
export function useListLostItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListLostItemsData>): UseDataConnectQueryResult<ListLostItemsData, undefined>;
