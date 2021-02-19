import { combineReducers } from "redux";
import auth from "./auth";
import meeting from "./meeting";

export default combineReducers({ auth, meeting });