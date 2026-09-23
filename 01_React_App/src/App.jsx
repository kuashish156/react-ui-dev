import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Count from "./components/Count";
import Task from "./components/Task";
import Footer from "./components/Footer";
import UserForm from "./components/UserForm";
import UseRef from "./components/UseRef";
function App() {
  return (
    <>
      <UseRef />
      <UserForm />
      <Count />
      <Task />
      <Footer />
    </>
  );
}

export default App;
