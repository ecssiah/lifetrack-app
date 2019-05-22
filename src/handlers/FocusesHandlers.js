import { Alert } from 'react-native'
import { extend, isEmpty } from 'lodash-es'
import { db, auth } from "../config/firebaseConfig"
import AsyncStorage from '@react-native-community/async-storage';
import { displayTime, getElapsed, getDay } from '../../lib/utils'
import { 
  UPDATE_FOCUSES,
  ADD_FOCUS, UPDATE_FOCUS, DELETE_FOCUS, FOCUSES_KEY, 
} from "../constants/Focuses"
import { UPDATE_STATUS } from "../constants/Status"
import { USER_KEY } from '../constants/User';


export function updateFocuses(dispatch, update) {
  dispatch({ type: UPDATE_FOCUSES, update })
}


export async function updateFocusesDB(update) {
  const batch = db.batch()

  for (const id in update) {
    const doc = await db.collection('focuses').doc(id)
    batch.update(doc, update[id])
  }

  batch.commit()
}


export async function updateFocusesLocal(update) {
  const focusesCollection = await AsyncStorage.getItem(FOCUSES_KEY)

  for (const id in update) {
    const focusDoc = focusesCollection[id]
    extend(focusDoc, update[id])
  }

  AsyncStorage.setItem(FOCUSES_KEY, JSON.stringify(focusesCollection))
}


export function addFocus(dispatch, id, focus) {
  dispatch({ type: ADD_FOCUS, id, focus })
}


export async function addFocusDB(focus) {
  const doc = await db.collection('focuses').add(focus)

  return doc.id
}


export async function addFocusLocal(focus) {
  const id = new Date().getTime()
  await AsyncStorage.mergeItem(FOCUSES_KEY, JSON.stringify({ [id]: focus }))

  const focusesRaw = await AsyncStorage.getItem(FOCUSES_KEY)
  const focuses = JSON.parse(focusesRaw)

  console.log(focuses)

  return id
}


export function deleteFocus(dispatch, id) {
  dispatch({ type: DELETE_FOCUS, id })
}


export async function deleteFocusDB(id) {
  db.collection('focuses').doc(id).delete()
}


export async function deleteFocusLocal(id) {
  const focusesCollectionRaw = await AsyncStorage.getItem(FOCUSES_KEY)
  const focusesCollection = JSON.parse(focusesCollectionRaw)

  delete focusesCollection[id]

  AsyncStorage.setItem(FOCUSES_KEY, JSON.stringify(focusesCollection))
}


export function updateFocus(dispatch, id, update) {
  dispatch({ type: UPDATE_FOCUS, id, update }) 
}


export async function updateFocusDB(id, update) {
  db.collection('focuses').doc(id).update(update)
}


export async function updateFocusLocal(id, update) {
  await AsyncStorage.mergeItem(USER_KEY, { [id]: update })
}


export async function updateFocusCategories(dispatch, name, newName) {
  const focusesCollectionRaw = await AsyncStorage.getItem(FOCUSES_KEY)
  const focusesCollection = JSON.parse(focusesCollectionRaw)

  const update = {}
  for (let [id, focus] of Object.entries(focusesCollection)) {
    if (focus.userId === auth.currentUser.uid && focus.category === name) {
      update[id] = { category: newName }
      extend(focusesCollection[id], update[id])
    }
  }

  await AsyncStorage.setItem(FOCUSES_KEY, JSON.stringify(focusesCollection))
  updateFocuses(dispatch, update)
}


export async function updateActiveFocuses(dispatch, activeStart) {
  const workingFocuses = await searchForWorkingFocuses()

  if (isEmpty(workingFocuses)) {
    const elapsed = getElapsed(activeStart)

    requestFocusUpdate(dispatch, workingFocuses, elapsed)
    deactivateFocuses(dispatch, workingFocuses)
  }
}


async function searchForWorkingFocuses() {
  const focusesCollectionRaw = await AsyncStorage.getItem(FOCUSES_KEY)
  const focusesCollection = JSON.parse(focusesCollectionRaw)

  const workingFocuses = {}
  for (let [id, focus] of focusesCollection) {
    const userActive = focus.userId === auth.currentUser.uid

    if (userActive && focus.active && focus.working) {
      workingFocuses[id] = focus
    }
  }

  return workingFocuses
}


async function deactivateFocuses(dispatch, workingFocuses) { 
  const focusesCollectionRaw = await AsyncStorage.getItem(FOCUSES_KEY)
  const focusesCollection = JSON.parse(focusesCollectionRaw)

  dispatch({ type: UPDATE_STATUS, update: { tracked: 0 } })

  const update = { active: false }

  for (let [id, focus] of Object.entries(workingFocuses)) {
    extend(focusesCollection[id], update)
    clearInterval(focus.timer)
    updateFocus(id, update)
  }

  await AsyncStorage.setItem(FOCUSES_KEY, JSON.stringify(focusesCollection))
}


function requestFocusUpdate(dispatch, workingFocuses, elapsed) {
  const title = 'Update Experience?'

  let message = ''
  message += 'These focuses have been active \n'
  message += `for ${displayTime(elapsed)} in the background.\n` 
  message += '\n'

  for (const focus of workingFocuses) {
    message += focus.name + '\n'
  }

  message += '\n'
  message += 'Is this correct?'

  Alert.alert(
    title, message,
    [
      { text: 'Cancel', onPress: null },
      { 
        text: 'Confirm', 
        onPress: () => updateExperience(dispatch, workingFocuses, elapsed),
      },
    ],
  )
}


function getUpdatedHistory(curHistory, elapsed) {
  const history = { ...curHistory }
  const elapsedTime = Date.now() + elapsed * 1000
  const today = getDay().toLocaleDateString(
    undefined, { 'month': 'numeric', 'day': 'numeric', 'year': 'numeric' }
  )
  const tomorrow = getDay(1).toLocaleDateString(
    undefined, { 'month': 'numeric', 'day': 'numeric', 'year': 'numeric' }
  )

  if (elapsedTime > tomorrow) {
    const overlapTime = tomorrow - elapsedTime

    history[tomorrow] = overlapTime

    if (history[today]) {
      history[today] += (elapsedTime - overlapTime) / 1000
    } else {
      history[today] = (elapsedTime - overlapTime) / 1000
    }
  } else {
    if (history[today]) {
      history[today] += elapsed
    } else {
      history[today] = elapsed
    }
  }

  return history
}


async function updateExperience(dispatch, workingFocuses, elapsed) {
  const focusesCollectionRaw = await AsyncStorage.getItem(FOCUSES_KEY)
  const focusesCollection = JSON.parse(focusesCollectionRaw)

  const update = {}

  for (let [id, focus] of workingFocuses) {
    update[id] = {
      level: focus.level,
      experience: focus.experience,
      history: getUpdatedHistory(focus.history, elapsed)
    }

    while (update[id].experience >= 100) {
      update[id].level++
      update[id].experience -= 100
    }

    extend(focusesCollection[id], update[id])
  }

  await AsyncStorage.setItem(FOCUSES_KEY, JSON.stringify(focusesCollection))
  updateFocuses(dispatch, update)
}


export async function resetFocuses(dispatch, focuses) {
  const focusUpdate = {} 
  for (let [id, focus] of Object.entries(focuses)) {
    focusUpdate[id] = {
      active: false,
      working: true,
      time: 60 * focus.workPeriod,
      timer: null,
    }
  }

  await updateFocuses(dispatch, focusUpdate)
  await updateFocusesLocal(focusUpdate)
}

