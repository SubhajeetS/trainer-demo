import { useState, useEffect, useMemo } from "react";
import { createSession } from "opentok-react";

const useSession = (session = {}) => {
    const { apiKey, sessionId, token } = session;
    const [streams, setStreams] = useState([]);
  
    const sessionHelper = useMemo(
      () =>
        createSession({
          apiKey,
          sessionId,
          token,
          onStreamsUpdated: (streams = []) => {
            setStreams([...streams]);
          },
        }),
      [apiKey, sessionId, token]
    );
  
    useEffect(() => {
      return () => {
        sessionHelper.disconnect();
      };
    }, [apiKey, sessionId, token]);
  
    return {
        sessionHelper,
        streams
    };
  };
  
  export default useSession;