import { db, auth } from "../config/fbConfig";
import { UPDATE_SETTINGS } from "../constants/Settings";
import { err } from "../utils";

export function updateSettings(dispatch, settings) {
  db.collection('settings').doc(auth.currentUser.uid).set(settings).then(() => {
    dispatch({ type: UPDATE_SETTINGS, settings });
  }).catch(err);
};