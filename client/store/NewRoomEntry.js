const WRITE_ROOM_NAME = "WRITE_ROOM_NAME";

export function writeRoomName (roomName) {
  const action = { type: WRITE_ROOM_NAME, roomName };
  return action;
}

export default function reducer (state = '', action) {

  switch (action.type) {
    case WRITE_ROOM_NAME:
      return action.roomName;
    default:
      return state;
  }
}
