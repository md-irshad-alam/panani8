export const navItems = () => {
  const token = sessionStorage.getItem("token");

  // If token exists, show "Logout", otherwise show "Signin"
  return [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Profile", url: "/profile" },
    { id: 3, title: "Blogs", url: "/blogs" },
    {
      id: 4,
      title: token ? "Logout" : "Signin",
      url: token ? "/signin" : "/signin",
    },
  ];
};
