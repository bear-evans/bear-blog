// ======================================
// Edit Page
// --------------------------------------
// Handles edits as opposed to creation
// ======================================
const editor = (function () {
  let URLparams = new URLSearchParams(window.location.search);
  let postID = URLparams.get('post');
  let apiURL = `/api/blogs/${postID}`;

  // Grabs the title and the content from the form
  function getData() {
    let title = $('#post-title').val().trim();
    let content = $('#post-text').val().trim();

    return {
      title: title,
      content: content,
    };
  }

  // Post submission via form
  async function submit() {
    console.log('Submit clicked!');
    event.preventDefault();
    let data = getData();
    console.log(data);
    if (!data.title || !data.content) {
      return;
    }

    const response = await fetch(apiURL, {
      method: 'PUT',
      body: JSON.stringify({
        title: data.title,
        content: data.content,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/blogs/${postID}`);
    } else {
      document.location.replace('/dashboard');
    }
  }

  // Grabs data from the server to populate the title and
  // content field with their current version
  async function initForm() {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    postData = await response.json();
    $('#post-title').val(postData.title);
    $('#post-text').val(postData.content);
  }

  // Initializes event listeners
  async function init() {
    initForm();
    $('#post-button').on('click', submit);
  }

  return {
    init: init,
  };
})();

// Trigger when document is ready
$(function () {
  editor.init();
});
