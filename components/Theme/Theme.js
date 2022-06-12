import { Fragment } from "react";
import useTheme from "../../hooks/useTheme";
import homeStyles from "../../styles/Home.module.css";

const Theme = () => {

    const { themes, setTheme, currentTheme } = useTheme();

    return (
        <Fragment>
            <div className={homeStyles.main}>
                <h1 className={homeStyles.title}>
                    Choose a <span className={homeStyles.span}>Theme</span>
                </h1>
            </div>
            {/* Theme Color  */}

            <div className={homeStyles.themeWrapper}>
                <form
                    className={homeStyles.theme}
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
        </Fragment>
    )
}
export default Theme;