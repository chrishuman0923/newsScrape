$(document).ready(() => {
  const $scrapeBtn = $('#scrapeBtn'),
    $addNoteBtn = $('.addNoteBtn'),
    $deleteNoteBtn = $('.deleteNote');

  $scrapeBtn.on('click', () => {
    $.get('/scrape', resp => {
      if (resp === 'Complete') {
        window.location.href = '/';
      }
    });
  });

  $addNoteBtn.on('click', function() {
    //prevent the form from refreshing the page
    event.preventDefault();

    //Get article ID and note contents
    let articleID = $(this).attr('data-id'),
      noteBody = $(`#${articleID}`).val();

    if (noteBody) {
      $.post(`/articles/${articleID}`, { body: noteBody }, () => {
        window.location.href = '/';
      });
    } else {
      alert('Please enter a note.');
    }
  });

  $deleteNoteBtn.on('click', function() {
    let articleID = $(this).attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: `/note/${articleID}`
    }).then(() => {
      window.location.href = '/';
    });
  });
});
