import { Routes } from "./routes";
import styles from "./App.module.css";

import { Navbar } from "./components/navbar";
import { Message } from "./components/message";
import { Footer } from "./components/footer";

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