import { Fragment, useEffect } from "react";
import useTheme from "../../hooks/useTheme";
import homeStyles from "../../styles/Home.module.css";

const Theme = ({
    colorHandler
}) => {

    const { themes, setTheme, currentTheme } = useTheme();
    
    useEffect(()=>{
        colorHandler(currentTheme)
    },[currentTheme]);

    return (
        <Fragment>
            <div className={homeStyles.themeWrapper}>
                <form
                    className={homeStyles.theme}
                    id="theme-input"
                >
                    {themes.map((item) => (
                        <input
                            key={item.id}
                            type="radio"
                            className={item.name}
                            id={item.id}
                            name="theme"
                            value={item.color}
                            checked={currentTheme.id === item.id}
                            onChange={(e) => setTheme(e.target.id)}
                        />
                    ))}
                </form>
            </div>
        </Fragment>
    )
}
export default Theme;