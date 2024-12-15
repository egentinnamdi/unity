const url = "https://unity-5jjx.onrender.com";
async function createUser(userObj) {
  const createUserUrl = `${url}/auth/register`;
  const unparsedUser = await fetch(createUserUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  const newUser = await unparsedUser.json();

  if (!newUser) console.log("New User creation failed");

  console.log(newUser);
  return newUser;
}

async function getUser(id) {
  const getUserUrl = `${url}/auth/${id}`;

  const res = await fetch(getUserUrl, {
    mode: "no-cors",
  });
  const user = await res.json();
  console.log(getUserUrl);

  if (!user) {
    console.log("User is undefined");
  }

  return user;
}

export { createUser, getUser };
