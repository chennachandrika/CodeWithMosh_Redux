import { useDispatch, useSelector } from "react-redux";
import { bugAdded, bugRemoved, bugResolved } from "../../store/bugs";
import { loadBugs } from "../../store/bugs";

function BugsView() {
  const bugsList = useSelector((store) => store.entities.bugs.list);
  const isLoading = useSelector((store) => store.entities.bugs.loading);
  const dispatch = useDispatch();
  let inputValue = null;
  const onAddBug = (event) => {
    event.preventDefault();
    dispatch(bugAdded({ title: inputValue }));
    dispatch(loadBugs());
    setTimeout(() => {
      dispatch(loadBugs());
    }, 5000);
  };
  const renderApp = () => {
    return (
      <div className="App">
        <h1>Bugs List</h1>
        <form onSubmit={onAddBug}>
          <input
            onChange={(e) => {
              inputValue = e.target.value;
            }}
          />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {bugsList.map((bugItem) => (
            <li key={bugItem.id}>
              {bugItem.title}
              <button
                onClick={() => {
                  dispatch(bugRemoved({ id: bugItem.id }));
                }}
              >
                X
              </button>
              <button
                onClick={() => {
                  dispatch(bugResolved({ id: bugItem.id }));
                }}
              >
                Alright
              </button>
            </li>
          ))}
        </ul>
        {isLoading && "Loading..."}
      </div>
    );
  };
  return renderApp();
}

export default BugsView;
