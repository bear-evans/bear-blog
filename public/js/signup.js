// ===================================
// Signup Form module
// ===================================
const signup = (function () {
  // grabs data from the form inputs and assembles them into
  // a data object
  function getData() {
    let nameRaw = $('#name-signup').val().trim();
    let emailRaw = $('#email-signup').val().trim();
    let passRaw = $('#password-signup').val().trim();
    let checkRaw = $('#password-check-signup').val().trim();

    // Quick and dirty checks to see if anything is empty
    // this wasn't part of the project so it's okay if it's clunky
    if (!nameRaw) {
      empError('name');
      return false;
    }

    if (!emailRaw) {
      empError('email');
      return false;
    }

    if (!passRaw) {
      empError('pass');
      return false;
    }

    if (!checkRaw) {
      empError('check');
      return false;
    }

    if (passRaw !== checkRaw) {
      passError();
      return false;
    }

    // User data object
    // TODO: Add validation so we're not using the raw input
    let data = {
      name: nameRaw,
      email: emailRaw,
      password: passRaw,
    };

    return data;
  }

  // creates an error notification if a field is empty
  function empError(err) {
    let styling = 'color: red;';
    switch (err) {
      case 'name':
        $('#error-name').html(
          `<p style="${styling}">Display name cannot be blank.</p>`
        );
        $('#name-signup').addClass('is-invalid');
        break;
      case 'email':
        $('#error-email').html(
          `<p style="${styling}">Email cannot be blank.</p>`
        );
        $('#email-signup').addClass('is-invalid');
        break;
      case 'pass':
        $('#error-pass').html(
          `<p style="${styling}">Password cannot be blank.</p>`
        );
        $('#password-signup').addClass('is-invalid');
        break;
      case 'check':
        $('#error-check').html(
          `<p style="${styling}">Password check cannot be blank.</p>`
        );
        $('#password-check-signup').addClass('is-invalid');
        break;
    }
  }

  // creates an error notification if passwords don't match
  function passError() {
    let styling = 'color: red;';
    $('#error-check').html(`<p style="${styling}">Passwords don't match.</p>`);
    $('#password-check-signup').addClass('is-invalid');
  }

  // clears all error displays
  function clearError() {
    $('#error-name').html(``);
    $('#error-email').html(``);
    $('#error-pass').html(``);
    $('#error-check').html(``);
    $('#name-signup').removeClass('is-invalid');
    $('#email-signup').removeClass('is-invalid');
    $('#password-signup').removeClass('is-invalid');
    $('#password-check-signup').removeClass('is-invalid');
  }

  async function submit() {
    event.preventDefault();
    clearError();
    let user = getData();

    // don't do anything if the get data didn't work.
    if (!user) {
      return;
    }
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      document.location.replace('/signup?error=DBErr');
    }
  }

  function init() {
    $('#signup-button').on('click', submit);

    const urlParams = window.location.search;
    const params = new URLSearchParams(urlParams);

    if (params.has('error')) {
      $('#error-box').toggleClass('hidden');
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
