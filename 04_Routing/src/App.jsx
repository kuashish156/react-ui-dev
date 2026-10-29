import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import ContectUs from "./components/ContectUs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import ContectUsIn from "./components/ContectUsIn";
import ContectUsEu from "./components/ContectUsEu";
import ContectUsUs from "./components/ContectUsUs";
function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Product" element={<ProductList />}></Route>
          <Route path="/Products/:id" element={<ProductDetails />}></Route>

          {/* Parent route for contect us  */}
          <Route path="/Contact" element={<ContectUs />}>
            {/* chiled  route for contect us  */}
            <Route path="in" element={<ContectUsIn />} />
            <Route path="eu" element={<ContectUsEu />} />
            <Route path="us" element={<ContectUsUs />} />
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
