import { User } from "@supabase/supabase-js";
import { supabase } from "../SupaBase/supabase";
import { useState, useEffect } from "react";
const Test = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await supabase.auth.getUser();
      setUser(response.data.user || null);
    };
  }, []);

  return (
    <div>
      <h2>testowe</h2>
      <h3>userId:{user?.id}</h3>
    </div>
  );
};

export default Test;
