import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Profile from "./pages/Profile";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/project",
    element: <Project />,
  },
  {
    path: "/project/:id",
    element: <Project />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
