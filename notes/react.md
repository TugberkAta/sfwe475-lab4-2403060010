Strand 1 question 7. `title` is a prop: the parent owns it and passes it in, so TaskCard can only read and display it. `done` starts as a prop too, but TaskCard copies that starting value into its own state with `useState`. The checkbox can flip `done` because `setDone` updates state the card owns; nothing in TaskCard can rewrite `title`, because there is no setter for a prop.

