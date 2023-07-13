import Image from "next/image";
import Weather from "./containers/Weather";
import styles from "./page.module.css";

import skyPortrait from "./assets/sky-portrait.jpg"


const Home = () => {
  return (
    <main className={styles.main}>
      <Weather />
    </main>
  );
};

export default Home;
