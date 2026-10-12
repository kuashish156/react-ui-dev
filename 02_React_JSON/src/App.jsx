import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import ProductList from "./components/ProductList";
import ProductListCustomHook from "./components/ProductListCustomHook";
import MediaPlayer from "./components/MediaPlayer";
import "./App.css";

function App() {
  return (
    <>
      <MediaPlayer />
      <ProductList />
      <ProductListCustomHook />
    </>
  );
}

export default App;
