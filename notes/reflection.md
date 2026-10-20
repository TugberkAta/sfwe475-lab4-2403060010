Strand 3 question 4. `FilterBar` and `TaskList` are siblings, and props only go from a parent to its children, so neither can read the other's state. `TaskBoard` holds `filter` and passes that one value down to both.

Strand 2 question 5. An index names a slot in `visibleTasks`, and filtering changes which task sits in that slot. `key={index}` makes React reuse the card at the old index, so its state stays behind on the wrong task. `task.id` stays with the task, so React keeps the same card.

Strand 3 question 6. Props flow down when `TaskBoard` passes `tasks` and `filter` into `TaskList`, then `title` and `done` into `TaskCard`. Requests flow up when `FilterBar` calls `onFilterChange` (`setFilter`) and `TaskCard` calls `onToggleTask` (`handleToggleTask`).
