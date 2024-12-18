React Query Learning Project

This project is focused on exploring and implementing features of React Query, including useQuery, useMutation, and useInfiniteQuery for efficient data fetching, caching, and state management in React applications.

Features Implemented:

1. Infinite Scroll using useInfiniteQuery

Implemented infinite scrolling to fetch paginated data from the server.

Key configurations learned:

staleTime: 5000: Prevents unnecessary server requests for 5 seconds.

refetchInterval: 1000: Automatically refetches data every second.

refetchIntervalInBackground: true: Ensures data is refetched even when the window is out of focus.

2. Data Fetching with useQuery

Used useQuery to fetch and cache server data efficiently.

Explored configurations like enabled, refetchOnWindowFocus, and staleTime.

3. Data Mutation with useMutation

Implemented useMutation for creating, updating, and deleting data.

Learned how to:

Trigger mutations manually.

Handle optimistic updates for better UI/UX.

Rollback changes in case of errors.

React Query Concepts Covered:

Caching:

Learned how React Query automatically caches fetched data.

Configured cacheTime and staleTime for efficient data management.

Refetching:

Configured automatic and manual refetching.

Explored the impact of refetchOnWindowFocus and refetchOnReconnect.

Background Updates:

Used refetchInterval and refetchIntervalInBackground to keep data updated.

Error Handling:

Explored error states and how to show fallback UI during errors.

Example Code Snippets:

Infinite Scroll:

```
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['users'],
  queryFn: fetchUserData,
  getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  staleTime: 5000, // Prevents refetching for 5 seconds.
  refetchInterval: 1000, // Auto-refetch every second.
  refetchIntervalInBackground: true, // Fetches even when the window is not in focus.
});
```

```
return (
  <div>
    {data?.pages.map((page) => (
      page.users.map((user) => <div key={user.id}>{user.name}</div>)
    ))}
    {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
  </div>
);
```

UseMutation Example:

```
const mutation = useMutation(newData => postData(newData), {
  onSuccess: () => {
    // Refetch or invalidate queries.
  },
  onError: (error) => {
    console.error('Error:', error);
  },
});

return (
  <button onClick={() => mutation.mutate({ name: 'New Data' })}>Submit</button>
);
```

Lessons Learned:

React Query simplifies data fetching and state management.

Its caching and background refetching capabilities reduce server load.

Infinite scrolling, combined with pagination, improves performance and user experience.

Understanding mutation handling is crucial for building interactive applications.

Future Scope:

Explore advanced patterns like query prefetching and optimistic updates.

Implement more real-world use cases for useInfiniteQuery and useMutation.
