import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export const fetchPosts = async (pageNumber: number) => {
  try {
    // const res = await api.get(`/postssss`); -> To get Error State
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=5`);
    //await new Promise((res) => setTimeout(res, 5000)); // -> To see the loader
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const fetchPostById = async (id: string) => {
  try {
    const res = await api.get(`/posts/${id}`);
    console.log("data is from id", id);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (id: any) => {
  try {
    const res = await api.delete(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error(error);
  }
};
export const updatePost = async (id: any) => {
  try {
    return await api.patch(`/posts/${id}`, { title: "i have updated" });
  } catch (error) {}
};
export const fetchUser = async ({ pageParam }: { pageParam: number }) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );
    console.log("res is resssssssss", res.status);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};
