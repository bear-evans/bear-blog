// ===================================
// Login/Logout module
// ===================================
const login = (function () {
  // grabs data from the form inputs and assembles them into
  // a data object
  function getData() {
    let emailRaw = $("#email-login").val().trim();
    let passRaw = $("#password-login").val().trim();

    // TODO: validate this in some way so we're not grabbing
    // raw user input
    let data = {
      email: emailRaw,
      password: passRaw,
    };

    return data;
  }

  async function logout() {
    event.preventDefault();
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    }
  }

  // Submits login when the button is clicked.
  // Redirects to the signup page
  async function submit(event) {
    event.preventDefault();
    let userData = getData();

    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
<<<<<<< Updated upstream:public/js/script.js
      document.location.replace("/signup?error=1");
=======
      document.location.replace("/signup?error=BadLogin");
>>>>>>> Stashed changes:public/js/login.js
    }
  }

  // Sets up event listeners
  function init() {
    $("#login-button").on("click", submit);
    $("#logout-button").on("click", logout);
  }

  return {
    init: init,
  };
})();

// Trigger when document is ready
$(function () {
  login.init();
});
