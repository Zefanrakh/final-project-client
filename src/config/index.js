export const config = {
  iceServers: [
    // {
    //   urls: "stun:stun.stunprotocol.org",
    // },
    // {
    //   urls: "turn:numb.viagenie.ca",
    //   credential: "muazkh",
    //   username: "webrtc@live.com",
    // },
    {
      url: "stun:global.stun.twilio.com:3478?transport=udp",
      urls: "stun:global.stun.twilio.com:3478?transport=udp",
    },
    {
      username:
        "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      credential: "tE2DajzSJwnsSbc123",
      url: "turn:global.turn.twilio.com:3478?transport=udp",
      urls: "turn:global.turn.twilio.com:3478?transport=udp",
    },
  ],
};

export const baseUrl = "https://coba-cctv.herokuapp.com/";
