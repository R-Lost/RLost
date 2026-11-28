# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateItem, useUpsertUser, useUpdateEmailNotification, useListLostItems, useListUserFoundItems, useListFoundItems, useSearchFoundItems, useGetUserSettings } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateItem(createItemVars);

const { data, isPending, isSuccess, isError, error } = useUpsertUser(upsertUserVars);

const { data, isPending, isSuccess, isError, error } = useUpdateEmailNotification(updateEmailNotificationVars);

const { data, isPending, isSuccess, isError, error } = useListLostItems();

const { data, isPending, isSuccess, isError, error } = useListUserFoundItems();

const { data, isPending, isSuccess, isError, error } = useListFoundItems();

const { data, isPending, isSuccess, isError, error } = useSearchFoundItems(searchFoundItemsVars);

const { data, isPending, isSuccess, isError, error } = useGetUserSettings(getUserSettingsVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createItem, upsertUser, updateEmailNotification, listLostItems, listUserFoundItems, listFoundItems, searchFoundItems, getUserSettings } from '@dataconnect/generated';


// Operation CreateItem:  For variables, look at type CreateItemVars in ../index.d.ts
const { data } = await CreateItem(dataConnect, createItemVars);

// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation UpdateEmailNotification:  For variables, look at type UpdateEmailNotificationVars in ../index.d.ts
const { data } = await UpdateEmailNotification(dataConnect, updateEmailNotificationVars);

// Operation ListLostItems: 
const { data } = await ListLostItems(dataConnect);

// Operation ListUserFoundItems: 
const { data } = await ListUserFoundItems(dataConnect);

// Operation ListFoundItems: 
const { data } = await ListFoundItems(dataConnect);

// Operation SearchFoundItems:  For variables, look at type SearchFoundItemsVars in ../index.d.ts
const { data } = await SearchFoundItems(dataConnect, searchFoundItemsVars);

// Operation GetUserSettings:  For variables, look at type GetUserSettingsVars in ../index.d.ts
const { data } = await GetUserSettings(dataConnect, getUserSettingsVars);


```