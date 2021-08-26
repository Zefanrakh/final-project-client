export const config = {
  iceServers: [
    {
      url: "stun:global.stun.twilio.com:3478?transport=udp",
      urls: "stun:global.stun.twilio.com:3478?transport=udp",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=udp",
      username:
        "29fcd817f8ac550079551fb8905ac445921872fa227fff3d961780eecd781c54",
      urls: "turn:global.turn.twilio.com:3478?transport=udp",
      credential: "qay/JufD6AmzmgBpYd09q4EE1Es464ewPmBO72zHzpg=",
    },
    {
      url: "turn:global.turn.twilio.com:3478?transport=tcp",
      username:
        "29fcd817f8ac550079551fb8905ac445921872fa227fff3d961780eecd781c54",
      urls: "turn:global.turn.twilio.com:3478?transport=tcp",
      credential: "qay/JufD6AmzmgBpYd09q4EE1Es464ewPmBO72zHzpg=",
    },
    {
      url: "turn:global.turn.twilio.com:443?transport=tcp",
      username:
        "29fcd817f8ac550079551fb8905ac445921872fa227fff3d961780eecd781c54",
      urls: "turn:global.turn.twilio.com:443?transport=tcp",
      credential: "qay/JufD6AmzmgBpYd09q4EE1Es464ewPmBO72zHzpg=",
    },
  ],
};

export const baseUrl = "https://coba-cctv.herokuapp.com/";
