import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

import Background from "./Background";

const Layout = ({ isMobile, sections }) => {
    const theme = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(!isMobile);

    React.useEffect(() => {
        setIsSidebarOpen(!isMobile);
    }, [isMobile]);

    const handleOpenSidebar = React.useCallback(() => {
        setIsSidebarOpen(true);
    }, []);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", position: "relative" }}>
            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    position: "relative",
                    height: "100vh",
                    overflowY: "auto",
                }}
            >
                <Background />
                {/* Hamburger Button for Mobile */}
                {isMobile && !isSidebarOpen && (
                    <Box
                        sx={{
                            position: "fixed",
                            top: 16,
                            left: 16,
                            zIndex: theme.zIndex.drawer + 2,
                        }}
                    >
                        <IconButton
                            onClick={handleOpenSidebar}
                            sx={{
                                color: "white",
                                backgroundColor: "rgba(0,0,0,0.3)",
                                "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                },
                            }}
                            aria-label="open drawer"
                        >
                            <MenuIcon sx={{ fontSize: 32 }} />
                        </IconButton>
                    </Box>
                )}

                {sections.map((sectionInfo) =>
                    React.cloneElement(sectionInfo.component, {
                        key: sectionInfo.id,
                    })
                )}

                <Box
                    sx={{
                        position: "fixed",
                        bottom: 12,
                        left: 12,
                        zIndex: theme.zIndex.tooltip,
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: "8px",
                        padding: "0.3rem 0.6rem",
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                    }}
                >
                    v2
                </Box>
            </Box>
        </Box>
    );
};

Layout.propTypes = {
    isMobile: PropTypes.bool.isRequired,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            ref: PropTypes.object.isRequired,
            component: PropTypes.element.isRequired,
        })
    ).isRequired,
};

export default React.memo(Layout);
