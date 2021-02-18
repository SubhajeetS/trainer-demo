export const getSession = () => {
  return Promise.resolve({
    apiKey: "your-api-key",
    sessionId: "your-session-id",
    token: "your-session-token",
  });
};
