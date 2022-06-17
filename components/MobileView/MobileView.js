import Head from "next/head";
import React from "react";
import styles from "../../styles/Mobile.module.css";
import Theme from "../Theme/Theme";
import ImageFader from "../ImageFader/ImageFader";

const MobileView = ({
    title,
    wishMsg,
    name,
    audioRef
}) => {
    return (
        <div className={`${styles.dark_mode} ${styles.container}`}>
            <Head>
                <title>Happy Birthday {name}</title>
                <link rel="icon" href="/favicon.ico" />
                <link href='https://fonts.googleapis.com/css?family=Sacramento:400' rel='stylesheet' type='text/css' />
            </Head>
            <canvas className={styles.canvas}
                style={{ backgroundColor: "transparent", left: 0, top: 0 }}
                id="canvas"></canvas>
            <main className={styles.animate}>
                <Theme />
                <div className={styles.main}>
                    {title}
                </div>
                <div className={styles.Main_Wapper}>
                    <div className={styles.Wapper_Left} style={{ backgroundColor: "black" }}>
                        <div id="bgi">
                            <img id="gifBorder" src="/media/bgi1.gif" width={"100%"} height={"100%"} />
                            <ImageFader />
                        </div>
                    </div>
                </div>
                <p className={styles.desc}>
                    {wishMsg}
                </p>
                <div className={styles.imageWrapper}>
                    <div className={styles.leftCake}><img width={"90px"} src="media/cake.gif" /></div>
                    <div className={styles.rightCake}><img width={"90px"} src="media/cake.gif" /></div>
                </div>
            </main>
            <audio id="player" ref={audioRef} autoPlay loop >
                <source src="media/Happy-Birthday.mp3" />
            </audio>
        </div>
    );
};

export default MobileView;
