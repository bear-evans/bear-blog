// ===================================
// Signup Form module
// ===================================
const signup = (function () {
  // grabs data from the form inputs and assembles them into
  // a data object
  function getData() {
    let nameRaw = $("#name-signup").val();
    let emailRaw = $("#email-signup").val();
    let passRaw = $("#password-signup").val();
    let checkRaw = $("#password-check-signup").val();

    // User data object
    // TODO: Add validation so we're not using the raw input
    let data = {
      name: nameRaw,
      email: emailRaw,
      password: passRaw,
    };

    return data;
  }
})();

// ===================================
// Login/Logout module
// ===================================
const login = (function () {
  // grabs data from the form inputs and assembles them into
  // a data object
  function getData() {
    let emailRaw = $("#email-login").val();
    let passRaw = $("#password-login").val();

    // TODO: validate this in some way so we're not grabbing
    // raw user input
    let data = {
      email: emailRaw,
      password: passRaw,
    };

    return data;
  }

  function submit() {
    let userData = getData();

    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ userData }),
      headers: { "Content-Type": "application/json" },
    });
  }
})();

// ===================================
// Main Module
// ===================================
const main = (function () {})();
