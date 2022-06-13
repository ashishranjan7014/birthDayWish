import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Name.module.css";
import { useRouter } from "next/router";
import ConfettiGenerator from "confetti-js";
import messages from "../utils/birthdayWishes.js";
import useTheme from "../hooks/useTheme";
import Theme from "../components/Theme/Theme";
import CakeImg from "../components/CakeImg/CakeImg";
import ImageFader from "../components/ImageFader/ImageFader";
import MobileView from "../components/MobileView/MobileView";

const Wish = ({ }) => {
  const router = useRouter();
  const { name } = router.query; // gets both name & color id in form of array [name,colorId]
  const color = name ? name[1] : 4; //extracting colorId from name
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [wishMsg, setWishMsg] = useState("");
  const [isMobile, setIsMobile] = useState(true);




  const audioRef = useRef();
  const { themes, setTheme, currentTheme } = useTheme();

  useEffect(() => {
    // Theme Change
    setTheme(color);
    let confetti;
    // Confetti
    const confettiSettings = {
      target: "canvas",
      start_from_edge: true,
      rotate: true,
      clock: isMobile?20: 250,
      size: isMobile?4:4,
      max: isMobile?40:80
    };
    confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    if(audioRef && audioRef.current){
      audioRef.current.play();
      audioRef.current.playbackRate = 1.2;
    }
    
    return () => confetti.clear();
  }, [color]);

  useEffect(() => {
    if (messages) {
      setWishMsg(messages[randomNumber(0, messages.length)].value)
      setInterval(() => {
        setWishMsg(messages[randomNumber(0, messages.length)].value);
      }, 10000);
    }
  }, [messages]);

  // function for randomly picking the message from messages array
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const title = (name) => {
    const wish = "Happy Birthday " + name + "!";
    const base_letters = [];
    const name_letters = [];

    for (let i = 0; i < wish.length; i++) {
      if (i < 15) {
        const letter = wish.charAt(i);
        base_letters.push(
          <span key={i} style={{ "--i": i + 1 }}>
            {letter}
          </span>
        );
      } else {
        const letter = wish.charAt(i);
        name_letters.push(
          <span key={i} style={{ "--i": i + 1 }} className={styles.span}>
            {letter}
          </span>
        );
      }
    }

    return (
      <h3 className={styles.title} style={{ "--wish-length": wish.length }}>
        <div>{base_letters.map((letter) => letter)}</div>
        <div className={styles.dynamicWord}>{name_letters.map((letter) => letter)}</div>
      </h3>
    );
  };

  return (!isMobile ?
    <div className={`${isDarkMode ? styles.dark_mode : styles.light_mode} ${styles.container}`}>
      <Head>
        <title>Happy Birthday {name && name[0]}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://fonts.googleapis.com/css?family=Sacramento:400' rel='stylesheet' type='text/css' />
      </Head>

      <canvas className={styles.canvas}
        style={{ backgroundColor: "transparent", left: 0, top: 0 }}
        id="canvas"></canvas>

      <main className={styles.animate}>
        <div className={styles.Main_Wapper}>
          <div className={styles.Wapper_Left} style={{ backgroundColor: isDarkMode ? "black" : "white" }}>
            <div id="bgi">
              <img id="gifBorder" src="/media/bgi1.gif" width={"100%"} height={"100%"} />
            </div>
          </div>
          <div className={styles.Wapper_Right} style={{ backgroundColor: isDarkMode ? "black" : "white" }}>
            <div className={styles.contentWrapper}>
              <ImageFader />
              <Theme />
              <div className={styles.wrapper}>
                <div className={styles.checkboxWrapper}>
                  <input type="checkbox" className={styles.checkbox} checked={isDarkMode} id="checkbox" onChange={() => { setIsDarkMode(!isDarkMode) }} />
                  <label htmlFor="checkbox" className={styles.label} style={{ backgroundColor: !isDarkMode ? "black" : "white" }}>
                    <i className={`${styles.fa_moon}`}></i>
                    <i className={`${styles.fa_sun}`}></i>
                    <div className={styles.ball} style={{ backgroundColor: isDarkMode ? "black" : "white" }}></div>
                  </label>
                </div>
                <div className={styles.main}>
                  {title(name && name[0] && name[0])}
                  <p className={styles.desc}>
                    {wishMsg}
                  </p>
                </div>
                <CakeImg />
              </div>
            </div>
          </div>
        </div>
      </main>
      <audio ref={audioRef} id="player" autoPlay loop >
        <source src="media/Happy-Birthday.mp3" />
      </audio>
    </div>
    :
    <MobileView
      name={name && name[0]}
      title={title(name && name[0] && name[0])}
      wishMsg={wishMsg}
    />
  );
};

export default Wish;
