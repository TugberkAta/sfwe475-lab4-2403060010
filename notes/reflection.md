Strand 3 question 4. `FilterBar` and `TaskList` are siblings, and props only go from a parent to its children, so neither can read the other's state. `TaskBoard` holds `filter` and passes that one value down to both.

Strand 2 question 5. An index names a slot in `visibleTasks`, and filtering changes which task sits in that slot. `key={index}` makes React reuse the card at the old index, so its state stays behind on the wrong task. `task.id` stays with the task, so React keeps the same card.

Strand 3 question 6. Props flow down when `TaskBoard` passes `tasks` and `filter` into `TaskList`, then `title` and `done` into `TaskCard`. Requests flow up when `FilterBar` calls `onFilterChange` (`setFilter`) and `TaskCard` calls `onToggleTask` (`handleToggleTask`).

Strand 1 question 4. An empty list means the request succeeded and there are simply no tasks yet; an error means the request failed and we do not know what the list is. The empty UI should invite the next step ("No tasks yet. Add your first one below."), while the error UI should explain the failure and offer recovery ("We couldn't load your tasks." plus Try again), not pretend the board is blank on purpose.

Strand 2 question 5. `safeParse` returns field-level issues, and `flatten().fieldErrors` groups them by key (`title`, `dueDate`, `status`). Storing the message under `errors.title` lets the form wire that text to the title input with `aria-invalid`, `aria-describedby`, and a nearby error paragraph, so the user knows which control to fix instead of hunting through one vague form-wide string.

Strand 3 question 6. `aria-live` marks a region whose content changes should be announced by assistive technology without moving focus. A sighted user sees "Loading tasks..." appear; a screen-reader user does not get that update unless the region is live, so `aria-live="polite"` is what makes the loading (and later empty/error) message audible when status changes.
