const authData = {
  users: [
    {
      username: import.meta.env.VITE_MOCK_ADMIN_USERNAME,
      password: import.meta.env.VITE_MOCK_ADMIN_PASSWORD,
      role: "admin",
    },
    {
      username: import.meta.env.VITE_MOCK_USER_USERNAME,
      password: import.meta.env.VITE_MOCK_USER_PASSWORD,
      role: "user",
    },
  ],
};

export default authData;
