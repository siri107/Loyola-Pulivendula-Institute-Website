const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/about",],
    exact: true,
    component: "About",
  },
  {
    path: ["/admin"],
    exact: true,
    components: "Admin"
  }
];

export default routes;
