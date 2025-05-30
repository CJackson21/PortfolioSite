import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CUSTOM_SCROLL_KEY = "__customScrollContext__";

const ScrollHandler = ({ sections, currentPath }) => {
  const observerRef = React.useRef(null);
  const scrollTimeoutRef = React.useRef(null);
  const navigate = useNavigate();
  const lastPathRef = React.useRef(currentPath);
  const isScrollingRef = React.useRef(false);
  const activeSectionRef = React.useRef(null);

  // Initialize global scroll context once
  React.useEffect(() => {
    if (!window[CUSTOM_SCROLL_KEY]) {
      window[CUSTOM_SCROLL_KEY] = {
        isProgrammaticScroll: false,
        lastManualScroll: 0,
      };
    }
  }, []);

  // Handle path changes
  React.useEffect(() => {
    if (window[CUSTOM_SCROLL_KEY]?.isProgrammaticScroll) {
      return;
    }

    const targetSection = sections.find((s) => s.path === currentPath);
    const targetElement = targetSection?.ref?.current;

    if (targetElement && !isScrollingRef.current) {
      window[CUSTOM_SCROLL_KEY].isProgrammaticScroll = true;
      isScrollingRef.current = true;
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        window[CUSTOM_SCROLL_KEY].isProgrammaticScroll = false;
        isScrollingRef.current = false;
      }, 1000);
    }

    lastPathRef.current = currentPath;
  }, [currentPath, sections]);

  const observer = React.useCallback(
    (entries) => {
      if (window[CUSTOM_SCROLL_KEY]?.isProgrammaticScroll) {
        return;
      }

      // Find the section closest to top and intersecting
      let closestEntry = null;
      let minDistance = Infinity;

      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const rect = entry.boundingClientRect;
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          closestEntry = entry;
        }
      });

      if (closestEntry) {
        const section = sections.find(
          (s) => s.ref.current === closestEntry.target
        );
        if (section && section.path !== activeSectionRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          activeSectionRef.current = section.path;

          // Remove debounce or reduce delay to 0ms or 50ms for faster update
          scrollTimeoutRef.current = setTimeout(() => {
            window[CUSTOM_SCROLL_KEY].isProgrammaticScroll = true;
            navigate(section.path, { replace: true });

            setTimeout(() => {
              window[CUSTOM_SCROLL_KEY].isProgrammaticScroll = false;
            }, 100);
          }, 50); // or 0
        }
      }
    },
    [sections, navigate]
  );

  // Track manual scrolling
  React.useEffect(() => {
    const handleScroll = () => {
      window[CUSTOM_SCROLL_KEY].lastManualScroll = Date.now();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observer setup and cleanup
  React.useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
    };

    observerRef.current = new IntersectionObserver(observer, observerOptions);

    sections
      .filter((s) => s.ref?.current)
      .forEach((s) => observerRef.current.observe(s.ref.current));

    return () => {
      observerRef.current?.disconnect();
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [sections, observer]);

  return null;
};

ScrollHandler.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      ref: PropTypes.shape({
        current: PropTypes.instanceOf(Element),
      }).isRequired,
    })
  ).isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default ScrollHandler;
