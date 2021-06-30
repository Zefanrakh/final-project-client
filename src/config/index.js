export const config = {
  iceServers: [
    {
      url: "stun:global.stun.twilio.com:3478?transport=udp",
      urls: "stun:global.stun.twilio.com:3478?transport=udp",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=udp",
      username:
        "64f5451e2dcf569c49652710512f6955a900ea3d4611393aef43ec89f7eaffe6",
      urls: "turn:global.turn.twilio.com:3478?transport=udp",
      credential: "nkL2rM3z8xAULmyFzs0R0jTaPzPmvAZ8bYDgMiWi/Ig=",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=tcp",
      username:
        "64f5451e2dcf569c49652710512f6955a900ea3d4611393aef43ec89f7eaffe6",
      urls: "turn:global.turn.twilio.com:3478?transport=tcp",
      credential: "nkL2rM3z8xAULmyFzs0R0jTaPzPmvAZ8bYDgMiWi/Ig=",
    },
    {
      url: "turn:global.turn.twilio.com:443?transport=tcp",
      username:
        "64f5451e2dcf569c49652710512f6955a900ea3d4611393aef43ec89f7eaffe6",
      urls: "turn:global.turn.twilio.com:443?transport=tcp",
      credential: "nkL2rM3z8xAULmyFzs0R0jTaPzPmvAZ8bYDgMiWi/Ig=",
    },
  ],
};

export const baseUrl = "https://coba-cctv.herokuapp.com/";
