// ===================================
// Signup Form module
// ===================================
const signup = (function () {
  // grabs data from the form inputs and assembles them into
  // a data object
  function getData() {
    let nameRaw = $("#name-signup").val().trim();
    let emailRaw = $("#email-signup").val().trim();
    let passRaw = $("#password-signup").val().trim();
    let checkRaw = $("#password-check-signup").val().trim();

    // User data object
    // TODO: Add validation so we're not using the raw input
    let data = {
      name: nameRaw,
      email: emailRaw,
      password: passRaw,
    };

    return data;
  }

  async function submit() {
    event.preventDefault();
    let user = getData();

    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      document.location.replace("/signup?error=DBErr");
    }
  }

  function init() {
    $("#signup-button").on("click", submit);

    const urlParams = window.location.search;
    const params = new URLSearchParams(urlParams);

    if (params.has("error")) {
      $("#error-box").toggleClass("hidden");
    }
  }

  return {
    init: init,
  };
})();

// Trigger when document is ready
$(function () {
  signup.init();
});
