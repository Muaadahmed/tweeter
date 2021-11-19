$(document).ready(() => {

  // Number decreases as you input text in compose text box.
  // Number turns red when it hits below 0.

  $('#tweet-text').on('input', function(event) {
    const $counter = $(this).parent().siblings().children('.counter');
    const limit = 140;
    let inputLength = $(this).val().length;
    if ($counter.val() <= 0) {
      $counter[0].style.color = 'red';
    } else {
      $counter[0].style.color = '#545149';
    }
    $counter.val(limit - inputLength);
  });
});