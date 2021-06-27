import { config } from "../../config";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import "./styles.scss";
const Viewer = () => {
  const socketRef = useRef();
  const history = useHistory();

  useEffect(async () => {
    socketRef.current = await io.connect("https://coba-cctv.herokuapp.com/");
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
      <div className="video-container">
        <video playsInline autoPlay muted></video>
        <div className="button-container__monitoring">
          <div className="close-button">
            <i
              class="fas fa-times"
              onClick={() => history.push("/appointment")}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
