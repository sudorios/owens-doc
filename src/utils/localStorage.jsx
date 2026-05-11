export const getGuildName = () => {
  return localStorage.getItem("guildName") || "Unknown Guild";
};

export const getSeasonName = () => {
  return localStorage.getItem("seasonName") || "Unknown Season";
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};
