import io from "socket.io-client";
import { useEffect, useRef } from "react";
import { config } from "../../config";
const Broadcaster = () => {
  const socketRef = useRef();
  const peerConnections = {};
  useEffect(async () => {
    socketRef.current = await io.connect("http://localhost:4000");

    socketRef.current.on("answer", (id, description) => {
      peerConnections[id].setRemoteDescription(description);
    });

    socketRef.current.on("watcher", (id) => {
      const peerConnection = new RTCPeerConnection(config);
      peerConnections[id] = peerConnection;

      let stream = videoElement.srcObject;
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("candidate", id, event.candidate);
        }
      };

      peerConnection
        .createOffer()
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socketRef.current.emit("offer", id, peerConnection.localDescription);
        });
    });

    socketRef.current.on("candidate", (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });
    console.log(peerConnections);

    socketRef.current.on("disconnectPeer", (id) => {
      peerConnections[id].close();
      delete peerConnections[id];
    });

    window.onunload = window.onbeforeunload = () => {
      socketRef.current.close();
    };

    // Get camera and microphone
    const videoElement = document.querySelector("video");
    const audioSelect = document.querySelector("select#audioSource");
    const videoSelect = document.querySelector("select#videoSource");

    audioSelect.onchange = getStream;
    videoSelect.onchange = getStream;

    getStream().then(getDevices).then(gotDevices);

    function getDevices() {
      return navigator.mediaDevices.enumerateDevices();
    }

    function gotDevices(deviceInfos) {
      window.deviceInfos = deviceInfos;
      for (const deviceInfo of deviceInfos) {
        const option = document.createElement("option");
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === "audioinput") {
          option.text =
            deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
          audioSelect.appendChild(option);
        } else if (deviceInfo.kind === "videoinput") {
          option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
          videoSelect.appendChild(option);
        }
      }
    }

    function getStream() {
      if (window.stream) {
        window.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      const audioSource = audioSelect.value;
      const videoSource = videoSelect.value;
      const constraints = {
        audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
        video: { deviceId: videoSource ? { exact: videoSource } : undefined },
      };
      return navigator.mediaDevices
        .getUserMedia(constraints)
        .then(gotStream)
        .catch(handleError);
    }

    function gotStream(stream) {
      window.stream = stream;
      audioSelect.selectedIndex = [...audioSelect.options].findIndex(
        (option) => option.text === stream.getAudioTracks()[0].label
      );
      videoSelect.selectedIndex = [...videoSelect.options].findIndex(
        (option) => option.text === stream.getVideoTracks()[0].label
      );
      videoElement.srcObject = stream;
      socketRef.current.emit("broadcaster");
    }

    function handleError(error) {
      console.error("Error: ", error);
    }
  });

  return (
    <div className="monitoring-container">
      <section class="select">
        <label for="audioSource">Audio source: </label>
        <select id="audioSource"></select>
      </section>

      <section class="select">
        <label for="videoSource">Video source: </label>
        <select id="videoSource"></select>
      </section>

      <video playsInline autoPlay muted></video>
      {/* <div className="start" onClick={connect}>
        go
      </div> */}
    </div>
  );
};

export default Broadcaster;
