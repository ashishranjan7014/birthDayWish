import styles from "../../styles/Name.module.css";

const CakeImg = () => {
    return (
        <div className={styles.imageWrapper}>
            <img width={"138px"} src="media/cake.gif" />
            <img width={"138px"} src="media/cake.gif" />
            <img width={"138px"} src="media/cake.gif" />
        </div>
    )
}
export default CakeImg;