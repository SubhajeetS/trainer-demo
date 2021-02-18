import React from "react";
import Playlist from "./playlist";
import Controls from "./controls";

const SIDEBAR_CONTAINER = {
    display: "flex",
    flexDirection: "column",
    padding: 5
}

const PLAYLIST = {
    flex: 3
}

const CONTROLS = {
    flex: 1
}

export function Sidebar() {
    return (
        <div style={SIDEBAR_CONTAINER}>
            <div style={PLAYLIST}> <Playlist /> </div>
            <div style={CONTROLS}> <Controls /> </div>
        </div>
    );
}