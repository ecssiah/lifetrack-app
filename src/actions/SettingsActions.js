import { 
  SET_SETTINGS,
  SET_DEFAULT_WORK_PERIOD, SET_DEFAULT_WORK_GOAL, SET_DEFAULT_BREAK_PERIOD,
} from "../constants/Settings";

export function setSettings(settings) {
  return {
    type: SET_SETTINGS,
    settings,
  };
};

export function setDefaultWorkPeriod(period) {
  return {
    type: SET_DEFAULT_WORK_PERIOD,
    period,
  };
};

export function setDefaultWorkGoal(goal) {
  return {
    type: SET_DEFAULT_WORK_GOAL,
    goal,
  };
};

export function setDefaultBreakPeriod(period) {
  return {
    type: SET_DEFAULT_BREAK_PERIOD,
    period,
  };
};