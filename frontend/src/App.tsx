import React from 'react';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import Home from './pages/Home';
import TodoApp from './pages/TodoApp';

const rootLoader = () => {
  const resp = 'call apis and other async functions and return their data which goes to the element of the path';
  return { resp };
}

const App: React.FC = () => { //FC is a react functional component (not a normal function), which returns JSX

  const router = createBrowserRouter([
    {
      path: "/TodoApp",
      element: <TodoApp />,
      errorElement: <div>Error on Todo App</div>,
      loader: rootLoader,
      // children: [
      //   {
      //     path: "todo/",
      //     element: <TodoApp />,
      //   },
      // ],
    },
    {
      path: "/",
      element: <Home />,
      errorElement: <div>Error on Home</div>,
      // children: [
      //   {
      //     path: "home",
      //     element: <TodoApp />,
      //   },
      // ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
