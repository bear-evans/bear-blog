// ======================================
// Dashboard
// --------------------------------------
// Dashboard Blogroll, not to be confused with
// Dashboard Confessional.
// ======================================
const dash = (function () {
  // Deletes a single blog post
  async function delPost(event) {
    event.preventDefault();

    let postId = $(this).data('post');
    let apiURL = `/api/blogs/${postId}`;

    const response = await fetch(apiURL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    }
  }

  // Initializes event listeners
  function init() {
    $('.dash-delete-button').on('click', delPost);
  }

  return {
    init: init,
  };
})();

// Trigger when document is ready
$(function () {
  dash.init();
});
