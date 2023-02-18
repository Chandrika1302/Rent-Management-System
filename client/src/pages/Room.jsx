import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      create Room <Link to={`/rooms/create`}>Create</Link>
    </div>
  );
}
