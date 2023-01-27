import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home stuff <Link to={`/login`}>login</Link>
    </div>
  );
}
