import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../Api/FetchPost";
import { useParams } from "react-router-dom";

export const FetchById = () => {
  const { id } = useParams();
  if (!id) {
    return <div> ID NOT FOUND</div>;
  }
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });

  if (isPending) return <div> Loading data</div>;
  if (isError) return <div> Error {error.message}</div>;
  return (
    <div>
      BODY :{data.body} <br />
      ID :{data.id} <br />
      Title :{data.title}
    </div>
  );
};
