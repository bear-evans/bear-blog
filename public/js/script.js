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
      document.location.replace("/signup?error=1");
    }
  }

  function init() {
    console.log("script loaded!");
    $("#login-button").on("click", submit);
  }

  return {
    init: init,
  };
})();

// Trigger when document is ready
$(function () {
  login.init();
});
