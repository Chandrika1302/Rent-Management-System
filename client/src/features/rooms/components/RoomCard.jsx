import * as React from "react";

export default function roomCard({ room }) {
  return (
    //todo styling
    <ul>
      <li>room number: {room.roomNumber}</li>
      <li>room rent: {room.baseRent}</li>
    </ul>
  );
}
