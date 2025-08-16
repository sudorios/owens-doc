import axios from "axios";

export const getUser = async () => {
  const res = await axios.get("http://localhost:3000/api/auth/me", {
    withCredentials: true,
  });
  return res.data;
};

export const getGuilds = async () => {
  const res = await axios.get("http://localhost:3000/api/guilds", {
    withCredentials: true,
  });
  return res.data.data;
};

export const syncGuilds = async () => {
  const res = await axios.post(
    "http://localhost:3000/api/guilds/sync",
    {},
    { withCredentials: true }
  );
  return res.data;
};
