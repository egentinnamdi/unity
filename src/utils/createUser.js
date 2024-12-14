async function createUser(userObj) {
  const url = "https://unity-5jjx.onrender.com/auth/register";
  const unparsedUser = await fetch(url, {
    method: "POST",
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

export default createUser;
