
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

      // constraints object
      const hdConstraints = {
        audio: false,
        video: {
          facingMode: "user",
          width: {min: 1280},
          height: {min: 720}
         }
      };
      // width & height is preference
      // facingMode can be an object to facingMode:{exact: "user || enviroment"}

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

      function gotStream(stream) {
        window.stream = stream;
        video.srcObject = stream;
      }

      function errorHandler(err) {
        console.error('Error', err);
      }

      NextcssFilter.onclick = function() {
        video.className = filters[filtersIndex++ % filters.length];
          $('outputFilterName').innerHTML = 'Current Filter: '
          + video.className.charAt(0).toUpperCase()
          + video.className.substring(1);
      };


      PrevcssFilter.onclick = function() {
        video.className = filters[filtersIndex-- % filters.length];
          $('outputFilterName').innerHTML = 'Current Filter: '
          + video.className.charAt(0).toUpperCase()
          + video.className.substring(1);
          if(video.className === 'undefined') {
            $('outputFilterName').innerHTML = 'Current Filter: None';
          }
      };

      //capture screenshot and attach styles from video
      screenShot.onclick = video.onclick = function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        img.src = canvas.toDataURL('image/webp');
        // generate thumbnails & controls for each screenshot
        let wrapperDiv = document.createElement('div');
        let createElement = document.createElement('img'); // create img element
        let appendData = createElement.src = canvas.toDataURL('image/webp'); // append src
        let fullPath = appendData.split(createElement); // get data from canvas
        let srcNode = document.createElement("img").src = fullPath; // append src to img node
        let imgNode = document.createElement("img");
        imgNode.src = srcNode;
        let attachData = query("picture").appendChild(wrapperDiv).appendChild(imgNode); // append div til picture tag --> append imgNode to div
        imgNode.className = "img-fluid img-thumbnail " + video.className;
        wrapperDiv.className = "img-wrapper";
        let delBtn = document.createElement('i');
        delBtn.className = "fas fa-trash text-danger";
        let editBtn = document.createElement('i');
        editBtn.className = "fas fa-edit text-info";

        wrapperDiv.appendChild(delBtn);
        wrapperDiv.appendChild(editBtn);

        let saveImg = document.createElement('a');
        saveImg.setAttribute("download", `${srcNode}+ .png`);
        saveImg.setAttribute("href", srcNode);
        saveImg.className = "fas fa-save";
        wrapperDiv.appendChild(saveImg);

        // delete node
        delBtn.addEventListener('click', () => {
          imgNode.remove();
          delBtn.remove();
          editBtn.remove();
          saveImg.remove();
          wrapperDiv.remove();
        });
      }

      //Record Video
      // let startRec = $('startRec');
      // let stopRec = $('stopRec');
      // let mediaRecorder = new MediaRecorder(gotStream);
      // let chunks = [];
      //
      // startRec.addEventListener('click', (e) => {
      //   mediaRecorder.start();
      //   log(mediaRecorder.state);
      // });
      // stopRec.addEventListener('click', (e) => {
      //   mediaRecorder.stop();
      //   log(mediaRecorder.state);
      // });
      // mediaRecorder.ondataavailable = function(e) {
      //   chunks.push(e.data);
      // }
      // mediaRecorder.onstop = (e) => {
      //   let blob = new Blob(chunks, { 'type' : 'video/mp4;'});
      //   chunks = [];
      //   let videoURL = window.URL.createObjectURL(blob);
      //   vidSave.src = videoURL;
      // }
