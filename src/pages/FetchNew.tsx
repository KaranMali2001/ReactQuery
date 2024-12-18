import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { deletePost, fetchPosts, updatePost } from "../Api/FetchPost";

export const FetchNew = () => {
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),

    // staleTime: 5000, //wont req server for 5 sec
    //refetchInterval: 1000, // -> wont refetch data if window is out of focus if referchIntervelInBackground Not added
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data: any, id) => {
      console.log("id ", data);
      queryClient.setQueryData(["posts", pageNumber], (curr) => {
        //@ts-ignore
        return curr?.filter((post: any) => post.id !== id);
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      console.log(apiData, postId);

      queryClient.setQueryData(["posts", pageNumber], (postsData: any) => {
        return postsData?.map((curPost: any) => {
          return curPost.id === postId
            ? //@ts-ignore
              { ...curPost, title: apiData.data.title }
            : curPost;
        });
      });
    },
  });
  if (isError) return <div>Some Error {error.message}</div>;
  if (isLoading) return <div>Still Fetching data</div>;
  return (
    <div>
      <ul>
        {data?.map((cur: any) => {
          const { id, title, body } = cur;
          return (
            <li key={id}>
              <NavLink to={`/fetch-new/${id}`}>
                <p>{id}</p>
                <p> {title}</p>
                <p> {body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          disabled={pageNumber === 0}
          onClick={() => setPageNumber((prev) => prev - 5)}
        >
          {" "}
          Prev
        </button>
        <p>{pageNumber / 5}</p>
        <button onClick={() => setPageNumber((prev) => prev + 5)}>Next</button>
      </div>
    </div>
  );
};
