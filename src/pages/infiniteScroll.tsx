import { useInfiniteQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchUser } from "../Api/FetchPost";

export const InfiniteScroll = () => {
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => fetchUser({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allpages) => {
      return lastPage.length === 10 ? allpages.length + 1 : undefined;
    },
  });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Infinite Scroll with React Query v5</h1>

      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page.map((user: any) => (
            <li
              key={user.id}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            >
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}
      <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Scroll down to load more"
          : "No more users"}
      </div>
    </div>
  );
};
