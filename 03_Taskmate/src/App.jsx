import Header from "./components/Header";
import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <AddTask />
      <ShowTask />
      <Footer />
    </div>
  );
}

export default App;
