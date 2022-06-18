import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../styles/Name.module.css";
import { useRouter } from "next/router";
import ConfettiGenerator from "confetti-js";
import messages from "../utils/birthdayWishes.js";
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
  const [isMobile, setIsMobile] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({});
  const audioRef = useRef();

  const isMobileDevice = () => {
    if (typeof window != "undefined") {
      // device detection
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }

  useEffect(() => {
    let confetti;
    // Confetti
    const confettiSettings = {
      target: "canvas",
      start_from_edge: true,
      rotate: true,
      clock: isMobile ? 100 : 250,
      size: isMobile ? 4 : 4,
      max: isMobile ? 40 : 80
    };
    confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    if (audioRef && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      audioRef.current.playbackRate = 1.2;
    }
    isMobileDevice();
    return () => confetti.clear();
  }, [color,audioRef]);

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
      <h5 className={styles.title} style={{ "--wish-length": wish.length }}>
        <div>{base_letters.map((letter) => letter)}</div>
        <div className={styles.dynamicWord}>{name_letters.map((letter) => letter)}</div>
      </h5>
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
              <Theme
                colorHandler={setCurrentTheme}
              />
              <div className={styles.wrapper}>

                <audio id="player" className={styles.player} ref={audioRef} autoPlay loop controls>
                  <source src="media/Happy-Birthday.mp3" />
                </audio>
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
                  <p className={styles.desc} style={{ color: currentTheme.color }}>
                    {wishMsg}
                  </p>
                </div>
                <CakeImg />
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
    :
    <MobileView
      name={name && name[0]}
      title={title(name && name[0] && name[0])}
      wishMsg={wishMsg}
      audioRef={audioRef}
    />
  );
};

export default Wish;
