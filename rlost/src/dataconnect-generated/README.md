# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListLostItems*](#listlostitems)
- [**Mutations**](#mutations)
  - [*CreateItem*](#createitem)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListLostItems
You can execute the `ListLostItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listLostItems(options?: ExecuteQueryOptions): QueryPromise<ListLostItemsData, undefined>;

interface ListLostItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLostItemsData, undefined>;
}
export const listLostItemsRef: ListLostItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listLostItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLostItemsData, undefined>;

interface ListLostItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListLostItemsData, undefined>;
}
export const listLostItemsRef: ListLostItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listLostItemsRef:
```typescript
const name = listLostItemsRef.operationName;
console.log(name);
```

### Variables
The `ListLostItems` query has no variables.
### Return Type
Recall that executing the `ListLostItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListLostItemsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListLostItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listLostItems } from '@dataconnect/generated';


// Call the `listLostItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listLostItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listLostItems(dataConnect);

console.log(data.items);

// Or, you can use the `Promise` API.
listLostItems().then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

### Using `ListLostItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listLostItemsRef } from '@dataconnect/generated';


// Call the `listLostItemsRef()` function to get a reference to the query.
const ref = listLostItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listLostItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.items);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateItem
You can execute the `CreateItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createItem(vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

interface CreateItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
}
export const createItemRef: CreateItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createItem(dc: DataConnect, vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

interface CreateItemRef {
  ...
  (dc: DataConnect, vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
}
export const createItemRef: CreateItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createItemRef:
```typescript
const name = createItemRef.operationName;
console.log(name);
```

### Variables
The `CreateItem` mutation requires an argument of type `CreateItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateItemVariables {
  itemName: string;
  description?: string | null;
  location?: string | null;
  imageLink?: string | null;
  category?: string | null;
  lostStatus: boolean;
}
```
### Return Type
Recall that executing the `CreateItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateItemData {
  item_insert: Item_Key;
}
```
### Using `CreateItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createItem, CreateItemVariables } from '@dataconnect/generated';

// The `CreateItem` mutation requires an argument of type `CreateItemVariables`:
const createItemVars: CreateItemVariables = {
  itemName: ..., 
  description: ..., // optional
  location: ..., // optional
  imageLink: ..., // optional
  category: ..., // optional
  lostStatus: ..., 
};

// Call the `createItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createItem(createItemVars);
// Variables can be defined inline as well.
const { data } = await createItem({ itemName: ..., description: ..., location: ..., imageLink: ..., category: ..., lostStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createItem(dataConnect, createItemVars);

console.log(data.item_insert);

// Or, you can use the `Promise` API.
createItem(createItemVars).then((response) => {
  const data = response.data;
  console.log(data.item_insert);
});
```

### Using `CreateItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createItemRef, CreateItemVariables } from '@dataconnect/generated';

// The `CreateItem` mutation requires an argument of type `CreateItemVariables`:
const createItemVars: CreateItemVariables = {
  itemName: ..., 
  description: ..., // optional
  location: ..., // optional
  imageLink: ..., // optional
  category: ..., // optional
  lostStatus: ..., 
};

// Call the `createItemRef()` function to get a reference to the mutation.
const ref = createItemRef(createItemVars);
// Variables can be defined inline as well.
const ref = createItemRef({ itemName: ..., description: ..., location: ..., imageLink: ..., category: ..., lostStatus: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createItemRef(dataConnect, createItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.item_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.item_insert);
});
```

