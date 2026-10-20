import TaskCard from "../TaskCard";
function App() {
  return (
    <div>
      <TaskCard title="Read Chapter 3" done={false} dueDate="Oct 21" />
      <TaskCard title="Read Chapter 4" done={true} />
    </div>
  );
}
export default App;
