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

async function uploadImage(file) {
  const bucketName = "profilePic";
  const uniqueFileName = `${Date.now()}-${file.name}`;
  console.log(bucketName, uniqueFileName, file);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(uniqueFileName, file);

  if (error) {
    toast.error(error.message);
  }

  const imgUrl = `https://ljroxogsifnbeofppyii.supabase.co/storage/v1/object/public/${data.fullPath}`;
  return imgUrl;
}

async function updateUser(userObj, jwtToken, id, image) {
  const uploadedImageLink = await uploadImage(image);
  const updatedUserObj = { profilePicture: uploadedImageLink, ...userObj };
  const getUserUrl = `${url}/auth/${id}`;
  console.log(typeof uploadedImageLink);
  console.log(updatedUserObj);
  const res = await fetch(getUserUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(updatedUserObj),
  });
  const updated = await res.json();

  return updated;
}

export { url, createUser, getUser, getAllUser, login, updateUser };
