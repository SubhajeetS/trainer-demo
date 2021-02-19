import React from "react";

export default function Playlist({ sendSignal }) {
    return (
        <div>
            <h4> Your Fancy Controls</h4>
            <button onClick={sendSignal}> Send Signal </button>
        </div>
    );
}