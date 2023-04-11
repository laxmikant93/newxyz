import React, { useRef } from "react";

import './NewTodo.css';

type NewTodoProps = {
  onAddTodo: (todoText: string) => void;  //type is an object which contains a function which accepts a string as an input and returns nothing
};

const NewTodo: React.FC<NewTodoProps> = props => { 
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => { 
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  );
};

export default NewTodo;