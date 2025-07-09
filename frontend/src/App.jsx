import { Routes } from "./routes";
import styles from "./App.module.css";
import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./components/navbar";
import { Message } from "./components/message";
import { Footer } from "./components/footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Message />
      <main className={styles.section}>
        <Routes />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;