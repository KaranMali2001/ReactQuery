import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <NavLink to={"/infite"}>InfiniteScroll </NavLink>
      <br />
      <NavLink to={"/fetch-old"}>Fetch Old</NavLink>
      <br />
      <NavLink to="/fetch-new">Fetch New</NavLink>
      <br />
      <NavLink to={"/"}>Home</NavLink>
    </div>
  );
};
