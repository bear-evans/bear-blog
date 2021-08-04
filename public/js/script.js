// ===================================
// Signup Form module
// ===================================
const signup = (function () {
  function getData() {
    let nameRaw = $("#name-signup").val();
    let emailRaw = $("#email-signup").val();
    let passRaw = $("#password-signup").val();
    let checkRaw = $("#password-check-signup").val();

    let data = {
      display_name: nameRaw,
      email: emailRaw,
      password: passRaw,
    };
  }
})();

const main = (function () {})();
