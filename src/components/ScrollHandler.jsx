import React from "react";
import PropTypes from "prop-types";

const ScrollHandler = ({ sections }) => {
  const observerRef = React.useRef(null);
  const scrollTimeoutRef = React.useRef(null);

  // Initialize the global scroll context if it doesn't exist
  React.useEffect(() => {
    if (!window.customScrollContext) {
      window.customScrollContext = { isProgrammaticScroll: false };
    }
  }, []);

  // Effect for initial load: scroll to section if hash matches
  React.useEffect(() => {
    const currentHash = window.location.hash.substring(1);
    if (currentHash) {
      const sectionToScroll = sections.find((s) => s.id === currentHash);
      if (sectionToScroll && sectionToScroll.ref.current) {
        if (window.customScrollContext)
          window.customScrollContext.isProgrammaticScroll = true;
        sectionToScroll.ref.current.scrollIntoView({
          behavior: "auto", // 'auto' for initial load, snaps quickly
          block: "start",
        });
        // Short timeout, as 'auto' scroll is fast, then allow observer to work
        setTimeout(() => {
          if (window.customScrollContext)
            window.customScrollContext.isProgrammaticScroll = false;
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]); // Rerun if sections change (though typically they don't after initial load)
  // Consider adding an empty array [] if sections are truly static post-mount
  // and you only want this to run once based on the initial sections prop.
  // However, if sections could dynamically change and require re-evaluation, [sections] is correct.

  // Effect for observing sections and updating hash on user scroll
  React.useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options = {
      root: null, // relative to document viewport
      rootMargin: "-40% 0px -40% 0px", // Section is "active" in the middle 20% of viewport
      threshold: 0, // Trigger as soon as any part enters/leaves the rootMargin area
    };

    observerRef.current = new IntersectionObserver((entries) => {
      if (window.customScrollContext?.isProgrammaticScroll) {
        return; // Ignore intersection changes during programmatic scroll
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = sections.find(
            (s) => s.ref.current === entry.target
          )?.id;
          if (sectionId) {
            // Debounce the hash update
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
              if (window.location.hash !== `#${sectionId}`) {
                window.history.replaceState(null, "", `#${sectionId}`);
              }
            }, 150); // Adjust debounce delay as needed
          }
        }
      });
    }, options);

    sections.forEach((section) => {
      if (section.ref.current) {
        observerRef.current.observe(section.ref.current);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [sections]);

  return null;
};

ScrollHandler.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        .isRequired,
    })
  ).isRequired,
};

export default ScrollHandler;
