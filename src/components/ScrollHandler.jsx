import React from "react";
import PropTypes from "prop-types";

const CUSTOM_SCROLL_KEY = "__customScrollContext__";

const ScrollHandler = ({ sections }) => {
  const observerRef = React.useRef(null);
  const scrollTimeoutRef = React.useRef(null);

  // Initialize global scroll context once
  React.useEffect(() => {
    if (!window[CUSTOM_SCROLL_KEY]) {
      window[CUSTOM_SCROLL_KEY] = { isProgrammaticScroll: false };
    }
  }, []);

  // Handle initial hash scroll
  React.useEffect(() => {
    const currentHash = window.location.hash.substring(1);
    if (!currentHash) {
      return;
    }

    const targetSection = sections.find((s) => s.id === currentHash);
    const targetElement = targetSection?.ref?.current;

    if (targetElement) {
      window[CUSTOM_SCROLL_KEY].isProgrammaticScroll = true;
      targetElement.scrollIntoView({ behavior: "auto", block: "start" });

      setTimeout(() => {
        window[CUSTOM_SCROLL_KEY].isProgrammaticScroll = false;
      }, 100);
    }
  }, [sections]);

  const observer = React.useCallback(
    (entries) => {
      if (window[CUSTOM_SCROLL_KEY]?.isProgrammaticScroll) {
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = sections.find(
            (section) => section.ref.current === entry.target
          )?.id;

          if (sectionId) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
              const newHash = `#${sectionId}`.toLowerCase();
              if (window.location.hash.toLowerCase() !== newHash) {
                window.history.replaceState(null, "", newHash);
              }
            }, 150);
          }
        }
      });
    },
    [sections]
  );

  // Observer setup and cleanup
  React.useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
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
      ref: PropTypes.shape({
        current: PropTypes.instanceOf(Element),
      }).isRequired,
    })
  ).isRequired,
};

export default ScrollHandler;
