import React, { useState } from 'react';
// import { Route } from 'react-router-dom';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';
import {MyTypography} from './components/MyTypography';

const App: React.FC = () => { //FC is a react functional component (not a normal function), which returns JSX
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
    <div className="App">
      {/* A component to add todos */}
      {/* <NewTodo onAddTodo={ todoAddHandler } />
      <TodoList items={ todos} onDeleteTodo={todoDeleteHandler} /> */}
      <MyTypography />
    </div>
  );
}

export default App;
