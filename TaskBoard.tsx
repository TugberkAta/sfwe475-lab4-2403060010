import { useCallback, useEffect, useState } from "react";
import type { Task } from "./schemas";
import TaskList from "./TaskList";
import NewTaskInput from "./NewTaskInput";
import FilterBar, { type TaskFilter } from "./FilterBar";
import { simulateFetchTasks } from "./mockApi";

const TASKS_STORAGE_KEY = "tasks";
const MIN_LOADING_MS = 400;

function revealAfterMinLoading(startedAt: number, reveal: () => void) {
  const elapsed = Date.now() - startedAt;
  const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
  window.setTimeout(reveal, remaining);
}

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
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [status, setStatus] = useState<
    "loading" | "success" | "empty" | "error"
  >("loading");

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

  const fetchTasks = useCallback(() => {
    const startedAt = Date.now();
    simulateFetchTasks()
      .then((data) => {
        revealAfterMinLoading(startedAt, () => {
          setTasks(data);
          setStatus(data.length === 0 ? "empty" : "success");
        });
      })
      .catch(() => {
        revealAfterMinLoading(startedAt, () => setStatus("error"));
      });
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
  const [filter, setFilter] = useState<TaskFilter>("all");

  if (status === "loading" || status === "error" || status === "empty") {
    return (
      <div>
        {status === "loading" && <p>Loading tasks...</p>}
        {status === "error" && (
          <>
            <p>We couldn't load your tasks.</p>
            <button
              type="button"
              onClick={() => {
                setStatus("loading");
                fetchTasks();
              }}
            >
              Try again
            </button>
          </>
        )}
        {status === "empty" && (
          <p>No tasks yet. Add your first one below.</p>
        )}
      </div>
    );
  }
  return (
    <div>
      <NewTaskInput onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={tasks} filter={filter} onToggleTask={handleToggleTask} />
    </div>
  );
}
export default TaskBoard;
