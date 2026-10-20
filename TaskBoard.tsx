import { useEffect, useState } from "react";
import type { Task } from "./schemas";
import TaskList from "./TaskList";
import NewTaskInput from "./NewTaskInput";
import FilterBar, { type TaskFilter } from "./FilterBar";

const TASKS_STORAGE_KEY = "tasks";
const defaultTasks: Task[] = [
  { id: 1, title: "Read Chapter 3", done: false },
  { id: 2, title: "Build TaskCard", done: true },
];

function loadTasks(): Task[] {
  const saved = localStorage.getItem(TASKS_STORAGE_KEY);
  if (!saved) return defaultTasks;
  try {
    const parsed: unknown = JSON.parse(saved);
    if (Array.isArray(parsed)) return parsed as Task[];
  } catch {
    return defaultTasks;
  }
  return defaultTasks;
}

function TaskBoard() {
  function handleAddTask(title: string) {
    setTasks([...tasks, { id: tasks.length + 1, title, done: false }]);
  }
  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
  const [filter, setFilter] = useState<TaskFilter>("all");
  return (
    <div>
      <NewTaskInput onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={tasks} filter={filter} onToggleTask={handleToggleTask} />
    </div>
  );
}
export default TaskBoard;
