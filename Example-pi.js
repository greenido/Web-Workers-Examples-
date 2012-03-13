 //
 // A simple way to find prime numbers
 // Please note the self refers to the worker context inside the worker.
 self.addEventListener('message', function(e) {
   var data = e.data;
   var shouldRun = true;

   switch (data.cmd) {
     case 'stop':
       postMessage('Worker stopped the Pi calculation ' + data.msg + "<br/>");
       shouldRun = false;
       self.close(); // Terminates the worker.
       break;
     case 'start':
       postMessage("Working on &#928 with: " + data.upto + " cycles<br/>");
       var numbers = calculatePi(data.upto);
       postMessage("pi: "+ numbers + "<br/>");
       break;
     default:
       postMessage('Dude, unknown cmd: ' + data.msg);
   };
 }, false);

 // simple calculation Pi base on Leibniz formula for Pi
 function calculatePi(cycles) {
  var pi = 0;
  var n  = 1;
  for (var i=0; i <= cycles; i++) {
    pi = pi + (4/n) - (4 / (n+2));
    n  = n  + 4;
  }
  return pi;
 }
