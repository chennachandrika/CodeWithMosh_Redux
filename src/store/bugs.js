import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "Bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },
    bugResolved: (bugs, action) => {
      const findBugIndex = bugs.list.findIndex(
        (bug) => bug.id === action.payload.id
      );
      bugs.list[findBugIndex].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      bugs.list = bugs.list.filter((bug) => bug.id !== action.payload.id);
      return bugs;
    }
  }
});

export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;

//Selector
// export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

//Memorization
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bugs) => !bugs.resolved)
);
