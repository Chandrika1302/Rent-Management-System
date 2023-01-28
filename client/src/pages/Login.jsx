import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../features/user/userSlice";
export default function Login() {
  const dispatch = useDispatch();
  return (
    <div>
      Login stuff <Link to={`/`}>Home</Link>
      <form onSubmit={submit}>
        <input type="text" name="username" />
        <button>submit</button>
      </form>
    </div>
  );

  function submit(e) {
    e.preventDefault();
    dispatch(login({ name: e.target.username.value }));
  }
}
