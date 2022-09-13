import { supabase } from "../../SupaBase/supabase";

const loginWithGitHub = (): void => {
  const options = {
    redirectTo: "localhost:3000/login",
  };
  supabase.auth.signIn({ provider: "github" }, options);
};

const addTask = async () => {
  const result =  supabase.from("Tasks").insert({
    Title: "new Task",
    Description: "added new task",
  })
  console.log(result);
};
const LoginOptions: React.FC = () => {
  return (
    <div>
      <h3>Login Options</h3>
      <button onClick={loginWithGitHub}>github</button>
      <button onClick={addTask}>add Task</button>
    </div>
  );
};

export default LoginOptions;
