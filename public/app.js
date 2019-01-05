$(document).ready(() => {
  const $scrapeBtn = $('#scrapeBtn');

  $scrapeBtn.on('click', () => {
    $.get('/scrape', resp => {
      if (resp === 'Complete') {
        window.location.href = '/';
      }
    });
  });
});
