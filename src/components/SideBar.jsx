import React from "react";
import {
    Box,
    Button,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom"; // <<<<<< IMPORT useLocation

import Resume from "./Resume";
import ThemeSwitcher from "./ThemeSwitcher";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Sidebar = ({ onLinkClick, isMobile, sections }) => {
    const theme = useTheme();
    const [isContactOpen, setIsContactOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // <<<<<< GET THE CURRENT LOCATION

    const getLinkColor = () => {
        return theme.palette.mode === "dark"
            ? theme.palette.text.primary
            : theme.palette.primary.main;
    };

    const navItemStyles = {
        // ... (styles remain the same)
        textDecoration: "none",
        fontWeight: 500,
        fontSize: isMobile ? "1.2rem" : "1.5rem",
        display: "block",
        cursor: "pointer",
        width: "100%",
        paddingY: isMobile ? 0.75 : 1.25,
        color: getLinkColor(),
        background: "none",
        border: "none",
        textAlign: "left",
        fontFamily: theme.typography.fontFamily,
        paddingLeft: 0,
        paddingRight: 0,
        "&:hover": {
            color: theme.palette.primary.dark,
        },
    };

    const handleContactOpen = React.useCallback(() => {
        setIsContactOpen(true);
        if (isMobile && onLinkClick) {
            onLinkClick();
        }
    }, [isMobile, onLinkClick]);

    const handleContactClose = React.useCallback(() => {
        setIsContactOpen(false);
    }, []);

    const navigateToSection = React.useCallback(
        (sectionId) => {
            navigate({ pathname: location.pathname, hash: sectionId });
            if (onLinkClick) {
                onLinkClick();
            }
        },
        [navigate, onLinkClick, location.pathname]
    );

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[5],
                display: "flex",
                flexDirection: "column",
                paddingTop: "env(safe-area-inset-top, 0px)",
                paddingBottom: "env(safe-area-inset-bottom, 16px)",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    paddingX: theme.spacing(2.5),
                    paddingY: theme.spacing(2),
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Stack spacing={isMobile ? 0.5 : 1} sx={{ flexGrow: 1 }}>
                    <Box
                        sx={{ alignSelf: "center", my: 2, textAlign: "center" }}
                    >
                        <img
                            src="/img/Jackson_Caleb_1-2.jpg"
                            alt="Caleb Jackson"
                            style={{
                                borderRadius: "50%",
                                width: isMobile ? "6.5rem" : "9rem",
                                height: "auto",
                                border: `3px solid ${theme.palette.primary.main}`,
                                objectFit: "cover",
                            }}
                        />
                    </Box>

                    {sections.map((section) => (
                        <React.Fragment key={section.id}>
                            <Typography
                                component="button"
                                onClick={() => navigateToSection(section.id)}
                                sx={navItemStyles}
                            >
                                {section.label}
                            </Typography>
                            <Divider />
                        </React.Fragment>
                    ))}

                    <Typography
                        component="a"
                        href="https://github.com/CJackson21"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={navItemStyles}
                        onClick={onLinkClick}
                    >
                        GitHub
                    </Typography>
                    <Divider />

                    <Resume
                        color={getLinkColor()}
                        isMobile={isMobile}
                        sx={navItemStyles}
                        onClick={onLinkClick}
                    />
                    <Divider />

                    {isMobile && (
                        <>
                            <Typography
                                component="button"
                                onClick={handleContactOpen}
                                sx={navItemStyles}
                            >
                                Contact Me
                            </Typography>
                            <Divider />
                            <Box sx={{ pt: 1 }}>
                                <ThemeSwitcher />
                            </Box>
                        </>
                    )}
                </Stack>

                {!isMobile && (
                    <Box sx={{ paddingY: theme.spacing(2), marginTop: "auto" }}>
                        <Stack spacing={1.5}>
                            <ThemeSwitcher />
                            <Divider sx={{ width: "100%", my: 1 }} />
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        marginBottom: 1,
                                        color:
                                            theme.palette.mode === "dark"
                                                ? theme.palette.text.primary
                                                : theme.palette.primary.main,
                                    }}
                                >
                                    Contact Me
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={2.5}
                                    alignItems="center"
                                >
                                    <Typography
                                        component="a"
                                        href="mailto:calebjackson2002@gmail.com"
                                        aria-label="Send Email"
                                        sx={{
                                            ...navItemStyles,
                                            paddingY: 0,
                                            "&:hover": {
                                                color: theme.palette.primary
                                                    .dark,
                                            },
                                        }}
                                    >
                                        <EmailIcon fontSize="large" />
                                    </Typography>
                                    <Typography
                                        component="a"
                                        href="https://instagram.com/cjjackson.15"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Visit Instagram"
                                        sx={{
                                            ...navItemStyles,
                                            paddingY: 0,
                                            "&:hover": {
                                                color: theme.palette.primary
                                                    .dark,
                                            },
                                        }}
                                    >
                                        <InstagramIcon fontSize="large" />
                                    </Typography>
                                    <Typography
                                        component="a"
                                        href="https://www.linkedin.com/in/caleb-jackson-b08660264"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Visit LinkedIn"
                                        sx={{
                                            ...navItemStyles,
                                            paddingY: 0,
                                            "&:hover": {
                                                color: theme.palette.primary
                                                    .dark,
                                            },
                                        }}
                                    >
                                        <LinkedInIcon fontSize="large" />
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                )}
            </Box>

            {isMobile && (
                <Dialog open={isContactOpen} onClose={handleContactClose}>
                    <DialogTitle
                        id="contact-dialog-title"
                        sx={{
                            color:
                                theme.palette.mode === "dark"
                                    ? theme.palette.text.primary
                                    : theme.palette.primary.main,
                            textAlign: "center",
                        }}
                    >
                        Contact Me
                    </DialogTitle>
                    <DialogContent dividers>
                        <Stack spacing={2.5} alignItems="center" sx={{ py: 2 }}>
                            <Typography
                                variant="body1"
                                textAlign="center"
                                color="text.secondary"
                            >
                                {`I'd love to hear from you! Reach out via email or social media.`}
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={3.5}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography
                                    component="a"
                                    href="mailto:calebjackson2002@gmail.com"
                                    aria-label="Send Email"
                                    sx={{
                                        ...navItemStyles,
                                        paddingY: 0,
                                        "&:hover": {
                                            color: theme.palette.primary.dark,
                                        },
                                    }}
                                >
                                    <EmailIcon sx={{ fontSize: "2.8rem" }} />
                                </Typography>
                                <Typography
                                    component="a"
                                    href="https://instagram.com/cjjackson.15"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit Instagram"
                                    sx={{
                                        ...navItemStyles,
                                        paddingY: 0,
                                        "&:hover": {
                                            color: theme.palette.primary.dark,
                                        },
                                    }}
                                >
                                    <InstagramIcon
                                        sx={{ fontSize: "2.8rem" }}
                                    />
                                </Typography>
                                <Typography
                                    component="a"
                                    href="https://www.linkedin.com/in/caleb-jackson-b08660264"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit LinkedIn"
                                    sx={{
                                        ...navItemStyles,
                                        paddingY: 0,
                                        "&:hover": {
                                            color: theme.palette.primary.dark,
                                        },
                                    }}
                                >
                                    <LinkedInIcon sx={{ fontSize: "2.8rem" }} />
                                </Typography>
                            </Stack>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                        <Button
                            onClick={handleContactClose}
                            variant="outlined"
                            color="primary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

Sidebar.propTypes = {
    onLinkClick: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Sidebar;
