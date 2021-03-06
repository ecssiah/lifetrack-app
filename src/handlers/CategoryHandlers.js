import { db, auth } from '../config/firebaseConfig'
import firebase from 'firebase'
import { 
  UNCATEGORIZED,
  ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY,
  UPDATE_CATEGORY_NAME,
} from "../constants/Categories"
import { updateFocusCategories } from './FocusesHandlers'


export function addCategory(dispatch, name, update) {
  dispatch({ type: ADD_CATEGORY, name, update })
}


export async function addCategoryDB(name, update) {
  const categoryItem = {
    [name]: update,
  }

  const doc = db.collection('categories').doc(auth.currentUser.uid)
  doc.update(categoryItem)
}


export function updateCategory(dispatch, name, update) {
  dispatch({ type: UPDATE_CATEGORY, name, update })
}


export async function updateCategoryDB(name, update) {
  const categoriesRef = db.collection('categories').doc(auth.currentUser.uid)

  const transactionUpdateFunc = async transaction => {
    const doc = await transaction.get(categoriesRef)
    const category = doc.data()

    const dbUpdate = {
      [name]: Object.assign({}, category[name], update)
    }

    transaction.update(categoriesRef, dbUpdate)
  }

  await db.runTransaction(transactionUpdateFunc)
}


export function deleteCategory(dispatch, name) {
  dispatch({ type: DELETE_CATEGORY, name })
}


export async function deleteCategoryDB(dispatch, name) {
  const update = {
    [name]: firebase.firestore.FieldValue.delete(),
  }

  const doc = db.collection('categories').doc(auth.currentUser.uid)
  await doc.update(update)

  updateFocusCategories(dispatch, name, UNCATEGORIZED)
}


export async function updateCategoryName(dispatch, name, newName) {
  const categoriesRef = db.collection('categories').doc(auth.currentUser.uid)

  const transactionUpdateFunc = async transaction => {
    const doc = await transaction.get(categoriesRef)
    const category = doc.get(name)

    const update = {
      [newName]: category,
      [name]: firebase.firestore.FieldValue.delete(),
    }

    transaction.update(categoriesRef, update)
  }

  await db.runTransaction(transactionUpdateFunc)

  await updateFocusCategories(dispatch, name, newName)

  dispatch({ type: UPDATE_CATEGORY_NAME, name, newName })
}

