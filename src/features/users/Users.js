import { useSelector } from "react-redux";

export default function Users({ userId }) {
  const users = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  );

  return <>{users ? users.name : "user not found"}</>;
}
