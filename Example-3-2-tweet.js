//
// Pull Tweets and send them so the parent page could save them in the localStorage
var connections = 0; 	 // count active connections  
var updateDelay = 30000; // = 30sec delay
var user = "greenido";

function getURL(user) {
  return 'http://twitter.com/statuses/user_timeline/' + user
  + '.json?count=' + 12 + '&callback=processTweets';
}
 
function readTweets() {
  try {
    var url = getURL(user);
    postMessage("Worker Status: Attempting To Read Tweets for user - " + user +
      " from: "+ url);
    importScripts(url);
  }
  catch (e) {
    postMessage("Worker Status: Error - " + e.message);
    setTimeout(readTweets, updateDelay);
  }
}

function processTweets(data) {
  var numTweets = data.length;	
  if (numTweets > 0) {
    postMessage("Worker Status: New Tweets - " +  numTweets);
    postMessage(data);
  } else {
    postMessage("Worker Status: New Tweets - 0");
  }
  setTimeout(readTweets, updateDelay);
}

//
// start the party in the worker
//
readTweets();
