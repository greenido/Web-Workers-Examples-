//
// Shared workers that handle the connections and Welcome each new script
// @author Ido Green
// @date   11/11/2011
var connections = 0; 	 // count active connections  
var updateDelay = 60000; // = 1min delay
var port;
var user;

function getURL(user) {
  return 'http://twitter.com/statuses/user_timeline/' + user
  + '.json?count=' + 12 + '&callback=processTweets';
}
 
function readTweets() {
  try {
    var url = getURL(user);
    port.postMessage("Worker: Attempting To Read Tweets for user - " + user +
      " from: "+ url);
    importScripts(url);
  }
  catch (e) {
    port.postMessage("Worker: Error - " + e.message);
    setTimeout(readTweets, updateDelay); // lets do it every 2min
  }
}

function processTweets(data) {
  if (data.length > 0) {
    port.postMessage("Worker: New Tweets - " + data.length);
    port.postMessage(data);
  } else {
    port.postMessage("Worker: New Tweets - 0");
  }
  setTimeout(readTweets, updateDelay);
}



//
// The controller that manage the actions/commands/connections
//
self.addEventListener("connect", function (e) {  
  port = e.ports[0];  
  connections++;  
  port.addEventListener("message", function (e) {  
    var data = e.data;
    switch (data.cmd) {
      case 'start':
        port.postMessage("Worker: Starting You are connection number:"+ connections);
        user = data.user;
        readTweets();
        break;
      case 'stop':
        port.postMessage("Worker: Stopping");
        self.close();
        break;
      default:
        port.postMessage("Worker: Error - Unknown Command");
    };
  
  }, false);  
  port.start();  
}, false);
