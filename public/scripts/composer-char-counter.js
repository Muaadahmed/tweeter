$(document).ready(() => {

  // Number decreases as you input text in compose text box.
  // Number turns red when it hits below 0.

  $('#tweet-text').on('input', function(event) {
    const $counter = $(this).siblings().children('.counter');
    const limit = 140;
    let inputLength = $(this).val().length;
    if ($counter.val() <= 0) {
      $counter.removeClass("defaultColor");
      $counter.addClass("changeColor");
    } else {
      $counter.removeClass("changeColor");
      $counter.addClass("defaultColor");
    }
    $counter.val(limit - inputLength);
  });
});