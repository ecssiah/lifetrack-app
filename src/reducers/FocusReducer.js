import { 
  SET_ID
} from "../actions/FocusActions";

function focusReducer(state = {}, action) {
  let newState = {...state};

  switch (action.type) {
    case SET_ID:
      newState.id = action.id;

      return newState;
    default:
      return newState;
  }
};

export default focusReducer;