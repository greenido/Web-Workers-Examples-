

// Take care of vendor prefixes.
self.postMessage = self.webkitPostMessage || self.postMessage;

var ready = false;

function time() {
  var now = new Date();
  var time = /(\d+:\d+:\d+)/.exec(now)[0] + ':';
  for (var ms = String(now.getMilliseconds()), i = ms.length - 3; i < 0; ++i) {
    time += '0';
  }
  return time + ms;
}

function source() {
    return '<span style="color:red;">The Worker:</span> ';
}

self.onmessage = function(e) {
  if (!ready) {
    initComplete();
    return;
  }
  var USE_TRANSFERRABLE = true;
  var dataLength;

  var uInt8View = null;
  if (e.data.copy !== undefined) {
    // not a copy case
    USE_TRANSFERRABLE = false;
    uInt8View = new Uint8Array(e.data.ourArray);
    dataLength = e.data.ourArray.byteLength;
  } 
  else {
    uInt8View = new Uint8Array(e.data);
    e.data.byteLength = e.data.byteLength;
  }

  // Here we are 'computing' something important on the data. 
  // In our case - just play with %
  for (var i=0; i < dataLength; i++ ) {
    uInt8View[i] = uInt8View[i] % 2;
  }
  
  if (USE_TRANSFERRABLE) {
    self.postMessage(uInt8View.buffer, [uInt8View.buffer]);
  } else {
    self.postMessage(e.data.ourArray);
  }
};

self.onerror = function(message) {
  log('worker error');
};

function log(msg) {
  var object = {
    type: 'debug',
    msg: source() + msg + ' [' + time() + ']'
  };
  self.postMessage(object);
}

function initComplete() {
  ready = true;
  log('READY!');
}

//setupArray();