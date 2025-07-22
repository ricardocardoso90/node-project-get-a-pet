import { Routes } from "./routes";
import styles from "./App.module.css";

import { Navbar } from "./components/Navbar";
import { Message } from "./components/Message";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Message />
      <main className={styles.section}>
        <Routes />
      </main>
      <Footer />
    </>
  );
};

export default App;