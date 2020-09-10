/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createHtmlTweet = (user, content, created_at) => {
  const $section = $('<section>').addClass('tweet-section');
  const $header = $('<header>').addClass('tweet-header');
  const $userName = $('<span>').addClass('user-name').text(user.name);
  const $userId = $('<span>').addClass('show-on-hover user').text(user.handle);

  $header.append($userName, $userId);

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

const validateForm = () => {
  const { errorList } = $('.new-tweet').validate({
    submitHandler: function (form) {
      $(form).ajaxSubmit();
    },
    rules: {
      text: {
        required: true,
        minlength: 1,
        maxlength: 140,
        remote: { url: '/tweets', async: false },
      },
    },
    messages: {
      text: {
        required: 'Tweet could not be empty',
        minlength: 'Tweet should contain minimum 1 character',
        maxlength: 'Tweet should not exceed 140 characters',
      },
    },
  });
  return errorList.length ? true : false;
};

const getTweets = async () => {
  const data = await $.get('/tweets');
  const $tweetBody = $('.tweet-body');

  data.forEach(({ user, content, created_at }) => {
    const $section = createHtmlTweet(user, content, created_at);

    $tweetBody.prepend($section);
  });
};

$('.new-tweet').on('submit', function (e) {
  e.preventDefault();

  // const textarea = $(this).children('textarea').val();
  // console.log(textarea);
  const errorResult = validateForm();
  if (!errorResult) {
    try {
      const serializedData = $(this).serialize();
      console.log('btn clicked try');

      $.post('/tweets', serializedData).then((res) => {
        getTweets();
      });

      $(this).children('textarea').val('');
    } catch (error) {
      console.error(error);
    }
  }
});

$(document).ready(function () {
  getTweets();
});
