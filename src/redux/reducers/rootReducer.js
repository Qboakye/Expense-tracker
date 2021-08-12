import { projectReducer } from "./projectReducer";
import { authReducer } from "./authReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  project: projectReducer,
  auth: authReducer,
});
