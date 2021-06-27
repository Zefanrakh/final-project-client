import { config } from "../../config";
import { useEffect, useRef } from "react";
import io from "socket.io-client";

const Viewer = () => {
  const socketRef = useRef();

  useEffect(async () => {
    socketRef.current = await io.connect("http://localhost:4000");
    const video = document.querySelector("video");
    let peerConnection = {};

    socketRef.current.on("offer", (id, description) => {
      peerConnection = new RTCPeerConnection(config);
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socketRef.current.emit("answer", id, peerConnection.localDescription);
        });
      peerConnection.ontrack = (event) => {
        video.srcObject = event.streams[0];
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("candidate", id, event.candidate);
        }
      };
    });

    socketRef.current.on("candidate", (id, candidate) => {
      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error(e));
    });

    socketRef.current.on("connect", () => {
      socketRef.current.emit("watcher");
    });

    socketRef.current.on("broadcaster", () => {
      socketRef.current.emit("watcher");
    });

    window.onunload = window.onbeforeunload = () => {
      socketRef.current.close();
      peerConnection.close();
    };
  });

  return (
    <div className="viewer-container">
      <video playsInline autoPlay muted></video>
    </div>
  );
};

export default Viewer;
