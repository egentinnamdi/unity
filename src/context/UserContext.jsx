import { createContext, useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import { getAllUser, getUser, login } from "../utils/CRUD";

const Context = createContext(null);

// Login Credentials
const logDetails = {
  email: "grace@example.com",
  password: "GracePass2025",
};

// Get User Id
const id = "072ff946-4991-4d4e-a7a6-0b6e58054c84";

export default function UserContext({ children }) {
  // Login
  const { data: loggedIn } = useQuery({
    queryKey: ["login"],
    queryFn: () => login(logDetails),
  });

  //   Get User data
  const { data: user } = useQuery({
    queryKey: ["retrieveUser", loggedIn?.token],
    queryFn: () => getUser(id, loggedIn?.token),
  });

  //   Get User data
  const { data: users } = useQuery({
    queryKey: ["retrieveUser", loggedIn?.token],
    queryFn: () => getAllUser(loggedIn?.token),
  });
  console.log(users);
  const data = { loggedIn, user };

  return <Context.Provider value={data}>{children}</Context.Provider>;
}

function useUser() {
  return useContext(Context);
}

export { useUser };
