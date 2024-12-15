const url = "https://unity-5jjx.onrender.com";
async function createUser(userObj) {
  const createUserUrl = `${url}/auth/register`;
  const unparsedUser = await fetch(createUserUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  const newUser = await unparsedUser.json();

  if (!newUser) console.log("New User creation failed");

  console.log(newUser);
  return unparsedUser;
}

// Login
async function login(credentials) {
  const loginUrl = `${url}/auth/login`;
  const response = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();

  return result;
}

// Get User After Login and Authorization
async function getUser(id, jwtToken) {
  const getUserUrl = `${url}/auth/${id}`;

  const res = await fetch(getUserUrl, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const user = await res.json();

  if (!user) {
    console.log("User is undefined");
  }

  return user;
}

// Get User After Login and Authorization
async function getAllUser(jwtToken) {
  const getUserUrl = `${url}/auth`;

  const res = await fetch(getUserUrl, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  const user = await res.json();

  if (!user) {
    console.log("User is undefined");
  }

  return user;
}

export { createUser, getUser, getAllUser, login };
