      const video = document.querySelector('video');
      const captVideo = document.querySelector('#captVideo');
      const screenShot = document.querySelector('#screenshot');
      const img = document.querySelector('img');
      const NextcssFilter = document.querySelector('#NextcssFilter');
      const PrevcssFilter = document.querySelector('#PrevcssFilter');

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
        img.className = filters[filtersIndex++ % filters.length];
        video.className = filters[filtersIndex++ % filters.length];
        console.log(img.className);
      };


      PrevcssFilter.onclick = function() {
        img.className = filters[filtersIndex-- % filters.length];
        video.className = filters[filtersIndex-- % filters.length];
        console.log(img.className);
      };

      screenShot.onclick = video.onclick = function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        // fallback
        img.src = canvas.toDataURL('image/webp');
      }

      function gotStream(stream) {
        window.stream = stream;
        video.srcObject = stream;
      }

      function errorHandler(err) {
        console.error('Error', err);
      }
