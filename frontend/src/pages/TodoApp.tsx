import React, { useState } from 'react';
// import { Route } from 'react-router-dom';
import { Outlet, Link, useLoaderData, } from "react-router-dom";
import TodoList from '../components/TodoList';
import NewTodo from '../components/NewTodo';
import { Todo } from '../todo.model';
// import {MyTypography} from './components/MyTypography';

const TodoApp: React.FC = () => { //FC is a react functional component (not a normal function), which returns JSX

  const resp  = useLoaderData();
  console.log(resp);

  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [...prevTodos, {id: Math.random().toString(), text: text}]);
    console.log(text);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId);
    });
  }

  return (
    <div className="TodoApp">
      {/* A component to add todos */}
      <NewTodo onAddTodo={ todoAddHandler } />
      <TodoList items={ todos} onDeleteTodo={todoDeleteHandler} />
      {/* <MyTypography /> */}
    </div>
  );
}

export default TodoApp;