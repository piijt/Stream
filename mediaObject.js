//User-Agent Sniffer.. if needed
  // User-Agent Has getUserMedia support
  // function userAgentHasMediaSupport () {
  //     return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  // }
  // if(userAgentHasMediaSupport()) {
  //     // do your thing
  // } else {
  //   alert("404! Your browser does not support this Mediums functionality - try another browser!");
  // }


  const constraints = {
    video: true
  }

  const hdConstraints = {
    video: {width: {min: 1280}, height: {min: 720}}
  };

  const vgaConstraints = {
    video: {width: {exact: 640}, height: {exact: 480}}
  };

  const video = document.querySelector('video');

  navigator.mediaDevices.getUserMedia(vgaConstraints)
      .then(gotStream).catch(errorHandler);

  function gotStream(stream) {
    window.stream = stream;
    video.srcObject = stream;
  }

  function errorHandler(err) {
    console.error('Error', err);
  }
