export const isAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    return !!token; // Return true if the token exists
  };