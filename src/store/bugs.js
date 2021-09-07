import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "Bugs",
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },
    bugResolved: (bugs, action) => {
      const findBugIndex = bugs.findIndex(
        (bug) => bug.id === action.payload.id
      );
      bugs[findBugIndex].resolved = true;
    },
    bugRemoved: (bugs, action) => {
      bugs = bugs.filter((bug) => bug.id !== action.payload.id);
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
