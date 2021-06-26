import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import { useEffect } from "react";
import routes from "./routes";
import store from "./store";
import "./App.css";

function App() {
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
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            {routes.map(({ path, component }) => {
              return (
                <Route path={path} exact>
                  {component}
                </Route>
              );
            })}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
