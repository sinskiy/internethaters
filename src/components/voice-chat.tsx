"use client";

import {
  ConnectionStateToast,
  ControlBar,
  GridLayout,
  LayoutContextProvider,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useCreateLayoutContext,
  useTracks,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import "@livekit/components-styles";
import { RoomEvent, Track } from "livekit-client";

interface VoiceChatProps {
  id: string;
  username: string;
}

export default function VoiceChat({ id, username }: VoiceChatProps) {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/token?room=${id}&username=${username}`);
        const data = await res.json();
        setToken(data.token);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id, username]);

  if (token === null) {
    return <div>loading...</div>;
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      audio={true}
      style={{ height: "100dvh" }}
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}

function VideoConference() {
  const tracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false }
  );

  const layoutContext = useCreateLayoutContext();

  return (
    <div className="lk-video-conference">
      <LayoutContextProvider value={layoutContext}>
        <div className="lk-video-conference-inner">
          <div className="lk-grid-layout-wrapper">
            <GridLayout tracks={tracks}>
              <ParticipantTile />
            </GridLayout>
          </div>
          <ControlBar
            controls={{
              camera: false,
              screenShare: false,
            }}
          />
        </div>
        <RoomAudioRenderer />
        <ConnectionStateToast />
      </LayoutContextProvider>
    </div>
  );
}
