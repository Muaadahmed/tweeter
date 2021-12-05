/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// Prevent unwanted injections or security breach by user

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetObj) {
  let $tweetMarkUp = 
    `<article>
        <header class="first-header">
          <span>
            <i>
              <img src=${tweetObj.user.avatars}>
              <span>${tweetObj.user.name}</span>
            </i>
          </span>
          <span class="smhand">${tweetObj.user.handle}</span>
        </header>
        <main class="main-tweet">
          <textarea name="textbox">${escape(tweetObj.content.text)}</textarea>
        </main>
        <footer class="first-footer">
          <p>${timeago.format(tweetObj.created_at)}</p>
          <ul>
            <li><a href="#"><i class="fas fa-flag fa-1x"></i></a></li>
            <li><a href="#"><i class="fas fa-retweet fa-1x"></i></a></i></li>
            <li><a href="#"><i class="fas fa-heart fa-1x"></i></a></i></li>
          </ul>
        </footer>
      </article>`;

  return $tweetMarkUp;
};

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').prepend($tweet);
  }
};

const loadTweets = function(renderTweet) {

  // delay an extra 500 milisecond to account for the simulate-delay function

  setTimeout(() => {
    $.get('/tweets', (data) => {
      console.log('fetch data', data);
      renderTweet(data);
    });
  }, 500);
};

$(document).ready(function() {
  loadTweets(renderTweets);

  // Display tweet under compose tweet box

  $('.create-tweet').submit(function(event) {
    event.preventDefault();

    //If input is empty

    if ($('#tweet-text').val() === '') {
      $('.error-message')[0].textContent = 'Please Enter Text!!!';
      $('.error-message').fadeIn(500);
      setTimeout(()=> {
        $('.error-message').fadeOut(500);
      }, 1500);
      return;
    }

    // If input has more than 140 chars
    if ($('#tweet-text').val().length > 140) {
      $('.error-message')[0].textContent = 'Too Long, respect limit: 140';
      $('.error-message').fadeIn(500);
      setTimeout(()=> {
        $('.error-message').fadeOut(500);
      }, 1500);
      return;
    }
    const $serializedValue = $('.create-tweet').serialize();
    $.post('/tweets', $serializedValue)
    .then(loadTweets(renderTweets))
    .catch(err => console.log(err.message));
    $('#tweet-text').val("");
  });

});
