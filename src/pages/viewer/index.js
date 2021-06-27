import { config, baseUrl } from "../../config";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import jwt from "jsonwebtoken";
import "./styles.scss";

const Viewer = () => {
  const socketRef = useRef();
  const history = useHistory();
  const { search } = useLocation();

  useEffect(() => {
    const parsed = queryString.parse(search);
    const decodeQuery = jwt.verify(parsed.query, "privateKey");
    const today = new Date().getTime();
    const from = new Date(decodeQuery.startDate).getTime();
    const to = new Date(decodeQuery.endDate).getTime();
    const withinRange = today >= from && today <= to;

    if (!withinRange) {
      history.push("/appointment?message=not-avalaible");
    }
  }, []);

  useEffect(async () => {
    socketRef.current = await io.connect(baseUrl);

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
