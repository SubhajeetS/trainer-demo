import config from "../config";

export const getSession = async (token) => {
  const response = await fetch(`${config.SERVER_BASE_URL}/meeting`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  
  const result = await response.json();
  if (result.code >= 400) {
    throw new Error(result.message);
  } else {
    return result;
  }
};