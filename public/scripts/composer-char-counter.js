let maxChars = 140;
$('#letter-count').text(maxChars);
$('#tweet-text').on('input', ({ target }) => {
  let charCount = maxChars - target.value.length;
  if (charCount > 0) {
    $('#letter-count').text(charCount).css({ color: 'black' });
  } else {
    $('#letter-count').text(charCount).css({ color: 'red' });
  }
});
