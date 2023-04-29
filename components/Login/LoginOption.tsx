import { singInWithGithub } from "../../SupaBase/singInOptions";
import { supabase } from "../../SupaBase/supabase";


const LoginOptions: React.FC = () => {
  return (
    <div>
      <h3>Login Options</h3>
      <button onClick={singInWithGithub}>github</button>
    </div>
  );
};

export default LoginOptions;
