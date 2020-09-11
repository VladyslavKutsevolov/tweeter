/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createHtmlTweet = (user, content, created_at) => {
  const $section = $('<section>').addClass('tweet-section');
  const $header = $('<header>').addClass('tweet-header');
  const $userName = $('<span>').addClass('user-name').text(user.name);
  const $avatars = $('<img>')
    .addClass('user-avatar')
    .attr('src', `${user.avatars}`);
  const $userId = $('<span>').addClass('show-on-hover user').text(user.handle);
  const $containerforUsename = $('<div>').addClass('username-container');

  $containerforUsename.append($avatars, $userName);
  $header.append($containerforUsename, $userId);

  const $tweetContent = $('<p>').addClass('tweet-content').text(content.text);

  const $tweetFooter = $('<footer>').addClass('tweet-footer');
  const $dateOfCreation = $('<time>')
    .addClass('timeago')
    .text(moment(created_at).fromNow());

  const $footerIcons = $('<div>').addClass('tweet-footer-icons')
    .append(`<i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>`);

  $tweetFooter.append($dateOfCreation, $footerIcons);

  $section.append($header, $tweetContent, $tweetFooter);

  return $section;
};

const validateForm = (formField) => {
  let errorMsg = '';

  if (!formField) {
    return (errorMsg += 'Tweet cannot be blank!');
  }

  if (formField.length > 140) {
    return (errorMsg += 'Tweet cannot exceed 140 characters!');
  }

  return errorMsg;
};

const getTweets = async () => {
  try {
    const data = await $.get('/tweets');
    const $tweetBody = $('.tweet-body');
    data.forEach(({ user, content, created_at }) => {
      const $section = createHtmlTweet(user, content, created_at);

      $tweetBody.prepend($section);
    });
  } catch (error) {
    console.error(error);
  }
};

$('.form-new-tweet').on('submit', function (e) {
  e.preventDefault();

  const inputVal = $(this).children('textarea').val();
  const errorResult = validateForm(inputVal);
  if (errorResult) {
    const errorMsg = $('<div>').addClass('tweet-text-error').text(errorResult);
    $('.tweet-text-error').remove();
    errorMsg.prependTo('.new-tweet');
    return;
  }

  try {
    $('.tweet-text-error').remove();
    const serializedData = $(this).serialize();

    $.post('/tweets', serializedData).then((res) => {
      getTweets();
      $(this).children('textarea').val('');
      $('#letter-count').text(140);
    });
  } catch (error) {
    console.error(error);
  }
});

getTweets();
