import config from "../config";

export const login = async (email, password) => {
  const response = await fetch(`${config.SERVER_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  
  const result = await response.json();
  if (result.code >= 400) {
    throw new Error(result.message);
  } else {
    return result;
  }
};

