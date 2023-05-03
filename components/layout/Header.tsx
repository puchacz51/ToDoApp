import React from "react";
import { useAppSelector } from "../../Store/Store";
import { Session } from "@supabase/supabase-js";
import { logOut } from "../../SupaBase/singInOptions";
const Header = () => {
  const { supbaseSession } = useAppSelector((state) => state.supabase);

  const user = supbaseSession?.user;
  return (
    <header>
      <h1>TodoApp </h1>
      <p>{user?.email}</p>
      <button onClick={logOut}>sing out</button>
    </header>
  );
};
export default Header;
