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
    event.preventDefault();
    let data = getData();
    if (!data.title || !data.content) {
      return;
    }

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

  async function addComment() {
    event.preventDefault();
    let postTo = $('#add-comment-button').data('postto');
    let commentText = $('#add-comment-body').val().trim();
    if (!commentText) {
      return;
    }

    const response = await fetch('/api/blogs/comment', {
      method: 'POST',
      body: JSON.stringify({
        content: commentText,
        on_post: postTo,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    }
  }
  // Initializes event listeners
  function init() {
    $('#post-button').on('click', submit);
    $('#add-comment-button').on('click', addComment);
  }

  return {
    init: init,
  };
})();

// Trigger when document is ready
$(function () {
  blog.init();
});
