// plugins/inactivity-logout.js

export default ({ app }) => {
  let inactivityTimer;

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);

    // Set the time (in milliseconds) for inactivity before logout (e.g., 15 minutes).
    const inactivityTimeout = 15 * 60 * 1000; // 15 minutes

    inactivityTimer = setTimeout(() => {
      const cookies = app.$cookies.getAll();
      Object.keys(cookies).forEach(cookieName => {
        app.$cookies.remove(cookieName);
      });

      // Redirect to the login page or any other page you prefer after logout.
      app.router.push('/login');
    }, inactivityTimeout);
  }

  // Register event listeners to reset the inactivity timer.
  function setupListeners() {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetInactivityTimer));
  }

  // Initial setup when the plugin is loaded.
  setupListeners();
};
