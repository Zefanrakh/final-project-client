import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import { useEffect } from "react";
import routes from "./routes";
import "./App.css";
import { setUserAction } from "./store/action";

function App() {
  const dispatch = useDispatch();
  // async function init() {
  //   const peer = createPeer();
  //   peer.addTransceiver("video", { direction: "recvonly" });
  // }

  // function createPeer() {
  //   const peer = new RTCPeerConnection({
  //     iceServers: [
  //       {
  //         urls: "stun:stun.stunprotocol.org",
  //       },
  //     ],
  //   });
  //   peer.ontrack = handleTrackEvent;
  //   peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

  //   return peer;
  // }

  // async function handleNegotiationNeededEvent(peer) {
  //   const offer = await peer.createOffer();
  //   await peer.setLocalDescription(offer);
  //   const payload = {
  //     sdp: peer.localDescription,
  //   };

  //   const { data } = await axios.post(
  //     "http://localhost:5100/consumer",
  //     payload
  //   );

  //   const desc = new RTCSessionDescription(data.sdp);
  //   peer.setRemoteDescription(desc).catch((e) => console.log(e));
  // }

  // function handleTrackEvent(e) {
  //   document.getElementById("video").srcObject = e.streams[0];
  // }

  // useEffect(() => {
  //   init();
  // }, []);
  useEffect(() => {
    const access_token = localStorage.access_token;
    if (access_token) {
      axios("http://localhost:3000" + "/user/getdata", {
        method: "POST",
        headers: {
          access_token,
        },
      })
        .then((res) => {
          dispatch(setUserAction(res.data.user));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map(({ path, component }, idx) => {
            return (
              <Route key={idx} path={path} exact>
                {component}
              </Route>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
