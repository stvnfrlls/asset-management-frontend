export default function ({ app, redirect }) {
  app.router.beforeEach((to, from, next) => {
    const authToken = app.$cookies.get("authToken");
    const permission = app.$cookies.get("permission");

    if (authToken && permission) {
      // User is authenticated and has the necessary permission
      if (to.path === "/auth/login") {
        // If the user is already authenticated and tries to access the login page, redirect to '/'
        next("/");
      } else {
        // User is authenticated, allow access to the route
        next();
      }
    } else {
      // User is not authenticated or doesn't have the necessary permission
      if (to.path === "/auth/login") {
        // If the user is not authenticated and tries to access the login page, allow access
        next();
      } else {
        // If the token cookie or permission cookie is missing, log out the user and redirect to '/auth/login'
        app.$cookies.remove("authToken"); // Clear 'authToken' cookie
        app.$cookies.remove("permission"); // Clear 'permission' cookie
        app.$cookies.remove("username"); // Clear 'username' cookie
        app.$cookies.remove("accountType"); // Clear 'accountType' cookie
        next("/auth/login");
      }
    }
  });
}
