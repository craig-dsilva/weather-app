import styles from "./page.module.css";
import Weather from "./containers/Weather";

const Home = () => {
  return (
    <main className={styles.main}>
      <Weather />
    </main>
  );
};

export default Home;
