import React, { useState } from "react";
import { OTPublisher } from "opentok-react";

export default function Publisher() {
    const [error, setError] = useState();

    return (
        <OTPublisher
          properties={{
            publishAudio: true,
            publishVideo: true
          }}
          onError={setError}
        />
    )
}
