let maxChars = 140;
$('#letter-count').text(maxChars);

$('[data-tweet-text]').on('input', ({ target }) => {
  $('.tweet-text-error').hide();
  let charCount = maxChars - target.value.length;
  if (charCount >= 0) {
    $('#letter-count').text(charCount).css({ color: 'black' });
  } else {
    $('#letter-count').text(charCount).css({ color: 'red' });
  }
});
