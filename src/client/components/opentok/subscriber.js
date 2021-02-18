import React, { useState } from "react";
import { OTSubscriber } from "opentok-react";

export default function Subscriber() {
    const [error, setError] = useState();

    return (
        <OTSubscriber
          properties={{
            subscribeToAudio: true,
            subscribeToVideo: true
          }}
          onError={setError}
          retry={true}
          maxRetryAttempts={3}
          retryAttemptTimeout={2000}
        />
    )
}
