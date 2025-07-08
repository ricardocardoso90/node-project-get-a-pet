import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.css";

import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className={styles.section}>
        <Routes />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;