import Head from "next/head";
import styles from "../styles/Home.module.css";
import useTheme from "../hooks/useTheme";

export default function Home() {
  const { themes, setTheme, currentTheme } = useTheme();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create a Birthday Wish</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.main}>
          <h1 className={styles.title}>
            Choose a <span className={styles.span}>Theme</span>
          </h1>
        </div>
        {/* Theme Color  */}

        <div className={styles.themeWrapper}>
          <form
            className={styles.theme}
            id="theme-input"
            onChange={(e) => setTheme(e.target.id)}
          >
            {themes.map((item) => (
              <input
                key={item.id}
                type="radio"
                className={item.name}
                id={item.id}
                name="theme"
                value={item.color}
                defaultChecked={currentTheme.id === item.id}
              />
            ))}
          </form>
        </div>
      </main>
    </div>
  );
}
