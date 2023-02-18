import { Link } from "react-router-dom";
import RoomsList from "../features/rooms/components/RoomsList.jsx";

export default function Home() {
  return (
    <div>
      create Room <Link to={`/rooms/create`}>Create</Link>
      <RoomsList />
    </div>
  );
}
