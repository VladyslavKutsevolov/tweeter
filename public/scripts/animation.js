$(document).ready(function () {
  $('.toggle-btn').click(function () {
    $('.new-tweet').slideToggle(700);
  });

  $(window).scroll(() => {
    const height = $('.main-header').height();

    if ($(window).scrollTop() >= height) {
      $('.scrollUp').addClass('active');
    } else {
      $('.scrollUp').removeClass('active');
    }
  });

  setInterval(loop, 700);
});
function loop() {
  $('.arrow').css('top', '0px');
  $('.arrow').animate({ top: 7 });
}
