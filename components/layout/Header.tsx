import React from "react";
import { useAppSelector } from "../../Store/Store";
import { logOut } from "../../SupaBase/singInOptions";
const Header = () => {
  const { supbaseSession } = useAppSelector((state) => state.supabase);
  const user = supbaseSession?.user;
  if (user)
    return (
      <header>
        <h1>TodoApp </h1>

        <button className="singOutBtn" onClick={logOut}>
          log out
        </button>
      </header>
    );

  return (
    <header>
      <h1>TodoApp </h1>
    </header>
  );
};
export default Header;
