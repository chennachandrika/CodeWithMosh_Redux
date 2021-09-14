import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "../store/api";

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
  bugsReceived
} = slice.actions;
export default slice.reducer;

//actionCreator
export const loadBugs = () =>
  actions.apiCallBegan({
    url: "https://jsonplaceholder.typicode.com/todos/",
    onStart: bugsRequested.type,
    data: bugsReceived.type,
    onSuccess: actions.apiCallSuccess.type,
    onFailure: actions.apiCallFailure.type
  });

//Selector
// export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

//Memorization
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bugs) => !bugs.resolved)
);
