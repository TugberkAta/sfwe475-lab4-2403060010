import { useState } from "react";

function NewTaskInput() {
  const [text, setText] = useState("");
  return (
    <>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
      />
      <button
        type="button"
        onClick={() => {
          console.log(text);
          setText("");
        }}
      >
        Add
      </button>
    </>
  );
}

export default NewTaskInput;
