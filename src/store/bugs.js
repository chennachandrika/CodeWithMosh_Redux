import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../store/api";
import momment from "moment";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload.data;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        title: action.payload.title,
        completed: false
      });
    },
    bugResolved: (bugs, action) => {
      const findBugIndex = bugs.list.findIndex(
        (bug) => bug.id === action.payload.id
      );
      bugs.list[findBugIndex].completed = true;
    },
    bugRemoved: (bugs, action) => {
      bugs.list = bugs.list.filter((bug) => bug.id !== action.payload.id);
      return bugs;
    }
  }
});

export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugsRequested,
  bugsReceived,
  bugsFailed
} = slice.actions;
export default slice.reducer;

//use thunk for not repetation of fetch
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const minDiff = momment().diff(momment(lastFetch), "minutes");
  if (minDiff < 10) return;

  dispatch(
    actions.apiCallBegan({
      url: "https://jsonplaceholder.typicode.com/todos/",
      onStart: bugsRequested.type,
      onError: bugsFailed.type,
      data: bugsReceived.type,
      onSuccess: actions.apiCallSuccess.type,
      onFailure: actions.apiCallFailure.type
    })
  );
};

//actionCreator
// export const loadBugs = () =>
//   actions.apiCallBegan({
//     url: "https://jsonplaceholder.typicode.com/todos/",
//     onStart: bugsRequested.type,
//     onError: bugsFailed.type,
//     data: bugsReceived.type,
//     onSuccess: actions.apiCallSuccess.type,
//     onFailure: actions.apiCallFailure.type
//   });

//Selector
// export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

//Memorization
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bugs) => !bugs.resolved)
);
