import { Routes } from "./routes";

import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;