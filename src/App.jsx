import React from "react";
import { useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import useCustomTheme from "./hooks/customizeReactTheme";
import About from "./components/About";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Layout from "./components/Layout";
// import ThreeJSLabels from "./components/ThreeJSLabels";

const App = () => {
    const { theme } = useCustomTheme();
    const isMobile = useMediaQuery("(max-width:899px)", { noSsr: true });
    const location = useLocation();

    console.log(location);

    // Create refs for each section
    const homeRef = React.useRef(null);
    const projectsRef = React.useRef(null);
    const aboutRef = React.useRef(null);

    const sections = React.useMemo(
        () => [
            // {
            //     id: "3dmodel",
            //     label: "3D Model",
            //     ref: React.createRef(),
            //     component: <ThreeJSLabels />,
            // },
            {
                id: "home",
                label: "Home",
                ref: homeRef,
                component: <Home ref={homeRef} />,
            },
            {
                id: "projects",
                label: "Projects",
                ref: projectsRef,
                component: <Projects ref={projectsRef} isMobile={isMobile} />,
            },
            {
                id: "about",
                label: "About Me",
                ref: aboutRef,
                component: <About ref={aboutRef} />,
            },
        ],
        [isMobile]
    );

    React.useEffect(() => {
        const currentHash = location.hash.substring(1);

        if (currentHash) {
            const sectionToScroll = sections.find(
                (sec) => sec.id === currentHash
            );
            console.log(sectionToScroll);
            if (
                sectionToScroll &&
                sectionToScroll.ref &&
                sectionToScroll.ref.current
            ) {
                sectionToScroll.ref.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        } else {
            if (window.scrollY !== 0) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    }, [location.hash, sections]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout isMobile={isMobile} sections={sections} />
        </ThemeProvider>
    );
};

export default App;
