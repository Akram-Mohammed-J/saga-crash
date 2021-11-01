import {
  takeEvery,
  takeLatest,
  call,
  fork,
  put,
  take,
} from "redux-saga/effects";
import * as api from "../api/users";
import * as actions from "../actions/users";
//Worker sagas
function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(
      actions.getUsersSuccess({
        items: result.data,
      })
    );
  } catch (e) {}
}
// the watcher function takes the action as parameter
function* createUser(action) {
  try {
    //How the call method works
    //call method takes 2 args
    // 1. which function needs to triggerd
    // 2. data we need to pass to function which is triggerd
    yield call(api.createUser, {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
    });
    yield call(getUsers);
  } catch (e) {}
}

function* deleteUser({ UserId }) {
  yield call(api.deleteUser, {
    userId: UserId,
  });
  yield call(getUsers);
}
// Watcher Sagas
function* watchGetUserRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* watchDeleteUserRequest() {
  while (true) {
    //take is lowlevel helper so it can't take a worker saga
    // we need to call seperately
    const action = yield take(actions.Types.DELETE_USER_REQUEST);
    //How the call method works
    //call method takes 2 args
    // 1. which function needs to triggerd
    // 2. data we need to pass to function which is triggerd
    yield call(deleteUser, {
      UserId: action.payload.userId,
    });
  }
}

const userSagas = [
  fork(watchGetUserRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest),
];

export default userSagas;
