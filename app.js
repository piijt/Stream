      'use strict';
      // Helper functions.. save keystrokes
      let log = console.log;
      let $ = function(foo) {
        return document.getElementById(foo);
      }
      let query = function(foo) {
        return document.querySelector(foo);
      }
      let queryAll = function(foo) {
        return document.querySelectorAll(foo);
      }
      // END HELPER FUNCTIONS

      const video = query('video');
      const captVideo = query('#captVideo');
      const screenShot = query('#screenshot');
      const img = query('img');
      const NextcssFilter = query('#NextcssFilter');
      const PrevcssFilter = query('#PrevcssFilter');

      const canvas = document.createElement("canvas");

      const constraints = {
        video: true
      }

      const hdConstraints = {
        video: {width: {min: 1280}, height: {min: 720}}
      };

      const vgaConstraints = {
        video: {width: {exact: 640}, height: {exact: 480}}
      };

      let filtersIndex = 0;
      const filters = [
        'grayscale',
        'sepia',
        'blur',
        'brightness',
        'contrast',
        'saturate',
        'saturate1',
        'invert',
        'drop-shadow',
        'hue-rotate',
        'hue-rotate1',
        'hue-rotate2',
        ''
      ];


      captVideo.onclick = function() {
          navigator.mediaDevices.getUserMedia(hdConstraints)
              .then(gotStream).catch(errorHandler);
      }

      NextcssFilter.onclick = function() {
        video.className = filters[filtersIndex++ % filters.length];
      };


      PrevcssFilter.onclick = function() {
        video.className = filters[filtersIndex-- % filters.length];
      };

      function dynamicImg() {
        this.innerHTML = 'Dynamic event success.';
        this.className += ' dynamic-success';
      }

      //capture screenshot and attach styles from video
      screenShot.onclick = video.onclick = function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        img.src = canvas.toDataURL('image/webp');
        // generate thumbnails for each screenshot
        let createElement = document.createElement('img'); // create img element
        let appendData = createElement.src = canvas.toDataURL('image/webp'); // append src
        let fullPath = appendData.split(createElement);
        let srcNode = document.createElement("img").src = fullPath;
        let imgNode = document.createElement("img");
        imgNode.src = srcNode;
        let attachData = query("picture").appendChild(imgNode);
        imgNode.className = "img-fluid img-thumbnail " + video.className;
      }

      function gotStream(stream) {
        window.stream = stream;
        video.srcObject = stream;
      }

      function errorHandler(err) {
        console.error('Error', err);
      }

      
