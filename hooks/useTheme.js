import { useState, useEffect } from "react";

//colors list

const useTheme = () => {

  const themes = [
    { id: 0, name: "blue", color: "#0070f3" },
    { id: 1, name: "green", color: "#10B981" },
    { id: 2, name: "violet", color: "#8B5CF6" },
    { id: 3, name: "yellow", color: "#FBBF24" },
    { id: 4, name: "red", color: "#E11D48" },
  ];

  const [currentTheme, setCurrentTheme] = useState(themes[4]);

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  };

  const setTheme = (id) => {
    const requiredTheme = themes.find((item) => id == item.id);
    // If the theme with the given id exists then change theme .
    if (requiredTheme) setCurrentTheme(requiredTheme);
    // If the theme with the given id does not exist then it doesnt change the default theme;
  };

  useEffect(() => {
    let root = document.documentElement;
    root.style.setProperty("--color", currentTheme.color);
  }, [currentTheme]);


  useEffect(() => {
    let interval = setInterval(() => {
      setTheme(randomIntFromInterval(0, 4));
    }, 5000);

    return (() => clearInterval(interval))
  }, []);

  return { themes, setTheme, currentTheme };
};

export default useTheme;
