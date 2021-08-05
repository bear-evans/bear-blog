// ===================================
// Blog and Comment Posting Module
// ===================================
const blog = (function () {
  function getData() {
    let title = $('#post-title').val().trim();
    let content = $('#post-text').val().trim();

    return {
      title: title,
      content: content,
    };
  }

  async function submit() {
    console.log('Post submit clicked');

    event.preventDefault();

    data = getData();
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        content: data.content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      document.location.replace('/create?Err=DBErr');
    }
  }
  // Initializes event listeners
  function init() {
    $('#post-button').on('click', submit);
  }

  return {
    init: init,
  };
})();

// Trigger when document is ready
$(function () {
  blog.init();
});
