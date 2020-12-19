import AgoraRTC from "agora-rtc-sdk-ng"
import { e } from '../../utils/utils'


const rtc = {
  // For the local client
  client: null,
  // For the local audio and video tracks
  localAudioTrack: null,
  // localVideoTrack: null,
};

// const options = {
//   // Pass your app ID here
//   appId: "<YOUR APP ID>",
//   // Set the channel name
//   channel: "demo_channel_name",
//   // Pass a token if your project enables the App Certificate
//   token: null,
//   // // If not specified, agora will automatically assign one
//   // uid: null,
// };

async function startBasicCall(options) {
  // Create a local client
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  // Subscribe to a remote user
  rtc.client.on("user-published", async (user, mediaType) => {
    // Subscribe to a remote user
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");

      // const playerContainer = document.createElement("div");
      // // Specify the ID of the DIV container. You can use the `uid` of the remote user.
      // playerContainer.id = "box" + user.uid;
      // console.log('playerContainer', playerContainer)
      // playerContainer.style.width = "100px";
      // playerContainer.style.height = "100px";
      // playerContainer.style.backgroundColor = "blue";
      // const videoBox = e('.video-agora-box')
      // videoBox.appendChild(playerContainer)

    if (mediaType === "audio" || mediaType === "all") {
      // Get `RemoteAudioTrack` in the `user` object.
      const remoteAudioTrack = user.audioTrack;
      // Play the audio track. Do not need to pass any DOM element
      remoteAudioTrack.play();
    }
  });

  rtc.client.on("user-unpublished", user => {
    // // Get the dynamically created DIV container
    // const playerContainer = document.getElementById(user.uid);
    // // Destroy the container
    // playerContainer.remove();
  });

  // Join a channel
  const uid = await rtc.client.join(options.appId, options.channel, options.token, null);

  // Create and publish the local tracks
  // Create an audio track from the audio captured by a microphone
  rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  // const localPlayer = document.createElement("div");
  // localPlayer.id = "box" + uid;
  // console.log('localPlayer', localPlayer)
  // localPlayer.style.width = "100px";
  // localPlayer.style.height = "100px";
  // localPlayer.style.backgroundColor = "red";
  //
  // const videoBox = e('#video-agora-local')
  // videoBox.appendChild(localPlayer)

  // Publish the local audio and video tracks to the channel
  await rtc.client.publish([rtc.localAudioTrack]);

  console.log("publish success!");
  console.log('rtc.client', rtc.client);

  console.log("Agora ID: ", uid);
  return uid;
}

async function leaveCall() {
  // Destroy the local audio and video tracks
  rtc.localAudioTrack.close();

  // const localPlayer = document.getElementById(rtc.client.uid);
  // localPlayer && localPlayer.remove()
  //
  // // Traverse all remote users
  // rtc.client.remoteUsers.forEach(user => {
  //   // Destroy the dynamically created DIV container
  //   const playerContainer = document.getElementById(user.uid);
  //   playerContainer && playerContainer.remove();
  // });

  // Leave the channel
  await rtc.client.leave();
}


export {
  startBasicCall,
  leaveCall,
}
