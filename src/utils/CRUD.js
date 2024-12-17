import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabaseUrl = "https://ljroxogsifnbeofppyii.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqcm94b2dzaWZuYmVvZnBweWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxMzIxMjMsImV4cCI6MjA0MjcwODEyM30.a2E8aOE3IiNbs_ts9-Zbl6_qkGAoGUiH_W4dNFq0u-8";

const supabase = createClient(supabaseUrl, supabaseKey);

// const { data, error } = supabase.storage.createBucket("profilePic", {
//   public: true,
// });

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

async function uploadImage(file, id, jwtToken) {
  const bucketName = "profilePic";

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(file.name, file);

  if (error) {
    toast.error(error.message);
  }
  // Full Image Link
  const profilePicture = `https://ljroxogsifnbeofppyii.supabase.co/storage/v1/object/public/${data.fullPath}`;

  // Update ProfilePic

  const response = await fetch(`${url}/auth/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({ profilePicture }),
  });

  await response.json();
}

async function updateUser(userObj, jwtToken, id, image) {
  if (image) {
    uploadImage(image, id, jwtToken);
  }
  console.log(userObj);
  const res = await fetch(`${url}/auth/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(userObj),
  });
  const updated = await res.json();
  console.log(updated);
  return updated;
}

export { url, createUser, getUser, getAllUser, login, updateUser };
