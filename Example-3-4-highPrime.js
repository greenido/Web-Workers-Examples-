 //
 // A simple way to find prime numbers
 // Please note the self refers to the worker context inside the worker.
 self.addEventListener('message', function(e) {
   var data = e.data;
   var shouldRun = true;

   switch (data.cmd) {
     case 'stop':
       postMessage('Worker stopped the prime calculation (Al Gore is happy now) ' + 
         data.msg );
       shouldRun = false;
       self.close(); // Terminates the worker.
       break;
     case 'start':
       postMessage("Worker start working up to: " + data.upto + " (" + new Date()+ ")<br/>");
       var numbers = isPrime(data.upto);
       postMessage("Got back these numbers: "+ numbers + "<br/>");
       break;
     default:
       postMessage('Dude, unknown cmd: ' + data.msg);
   };
 }, false);

 // simple calculation of primes (not the most efficient - but works)
 function isPrime(number) {
   var numArray = "";
   var thisNumber;
   var divisor;
   var notPrime;
   var thisNumber = 3;
   while(thisNumber < number) {
     var divisor = parseInt( thisNumber / 2);
     var notPrime = 0;
     while(divisor > 1) {
       if(thisNumber % divisor == 0) {
         notPrime = 1;
         divisor = 0;
       }
       else {
         divisor = divisor - 1;
       }
     }
     if(notPrime == 0) {
       numArray += (thisNumber + " ");
     }
     thisNumber = thisNumber + 1;
   }
   return numArray;
 }
