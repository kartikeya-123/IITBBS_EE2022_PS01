import { createTheme } from "@mui/material";
import themeColors from "./colors";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          wordWrap: "break-word",
          backgroundColor: themeColors.white.main,
          backgroundClip: "initial",
          border: "0",
          borderRadius: ".375rem",
          overflow: "unset",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1A0A43",
          width: "200px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "900px",
          maxHeight: "900px",
          borderRadius: "0px",
          boxShadow: "0px 11px 15px 0px #00000033",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          padding: "16px",
          border: "0px",
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          "&:hover": {
            backgroundColor: "#F8F8F8",
          },
        },

        input: {
          color: "black",
          padding: "0px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: "0px",
        },
        // input: {
        //   border: "1px solid black",
        // },
      },
    },

    // MuiContainer: {
    // 	styleOverrides: {
    // 		root: {
    // 			width: "100%",
    // 			paddingRight: "15px",
    // 			paddingLeft: "15px",
    // 			marginRight: "auto",
    // 			marginLeft: "auto",
    // 		},
    // 		maxWidthXs: {
    // 			"@media (min-width: 576px)": {
    // 				maxWidth: "540px",
    // 			},
    // 		},
    // 		maxWidthSm: {
    // 			"@media (min-width: 576px)": {
    // 				maxWidth: "540px",
    // 			},
    // 		},
    // 		maxWidthMd: {
    // 			"@media (min-width: 768px)": {
    // 				maxWidth: "720px",
    // 			},
    // 		},
    // 		maxWidthLg: {
    // 			"@media (min-width: 992px)": {
    // 				maxWidth: "960px",
    // 			},
    // 		},
    // 		maxWidthXl: {
    // 			"@media (min-width: 1200px)": {
    // 				maxWidth: "1140px",
    // 			},
    // 		},
    // 	},
    // },
    MuiCardContent: {
      styleOverrides: {
        root: {
          flex: "1 1 auto",
          minHeight: "1px",
          borderRadius: ".375rem",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          position: "relative",
          textTransform: "none",
          transition: "all .15s ease",
          letterSpacing: ".025em",
          fontSize: ".875rem",
          padding: ".625rem 1.25rem",
          willChange: "transform",
          border: "1px solid transparent",
          lineHeight: "1.5",
          borderRadius: ".375rem",
          userSelect: "none",
          display: "inline-block",
          fontWeight: 600,
          textAlign: "center",
          verticalAlign: "middle",
          boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)",
          // "&:hover": {
          // 	boxShadow: boxShadows.buttonBoxShadow,
          // 	transform: "translateY(-1px)",
          // },
        },
        text: {
          padding: ".625rem 1.25rem",
        },
        contained: {
          color: themeColors.white.main,
          borderColor: themeColors.dark.main,
          backgroundColor: themeColors.dark.main,
          // "&:hover": {
          // 	boxShadow: boxShadows.buttonBoxShadow,
          // 	backgroundColor: themeColors.dark.dark,
          // },
        },
        containedSizeSmall: {
          fontSize: ".75rem",
          padding: ".25rem .5rem",
          lineHeight: "1.5",
          borderRadius: ".375rem",
        },
        containedSizeLarge: {
          fontSize: ".875rem",
          lineHeight: 1.5,
          padding: ".875rem 1rem",
          borderRadius: ".4375rem",
        },
        containedPrimary: {
          borderColor: themeColors.primary.main,
        },
        containedSecondary: {
          borderColor: themeColors.secondary.main,
          // "&:hover": {
          // 	borderColor: themeColors.gray[200],
          // 	backgroundColor: themeColors.gray[200],
          // },
        },
        outlined: {
          padding: ".625rem 1.25rem",
          color: themeColors.dark.main,
          borderColor: themeColors.dark.main,
          boxShadow: "none",
          // "&:hover": {
          // 	boxShadow: "none",
          // 	backgroundColor: themeColors.dark.main,
          // 	color: themeColors.white.main,
          // },
        },
        outlinedSizeSmall: {
          fontSize: ".75rem",
          padding: ".25rem .5rem",
          lineHeight: "1.5",
          borderRadius: ".375rem",
        },
        outlinedSizeLarge: {
          fontSize: ".875rem",
          lineHeight: 1.5,
          padding: ".875rem 1rem",
          borderRadius: ".4375rem",
        },
        outlinedPrimary: {
          color: themeColors.primary.main,
          borderColor: themeColors.primary.main,
          // "&:hover": {
          // 	backgroundColor: themeColors.primary.main,
          // },
        },
        outlinedSecondary: {
          color: themeColors.secondary.btnOutline,
          borderColor: themeColors.secondary.main,
          backgroundColor: themeColors.transparent.main,
          // "&:hover": {
          // 	borderColor: themeColors.secondary.main,
          // 	backgroundColor: themeColors.secondary.main,
          // 	color: themeColors.gray[900],
          // },
        },
      },
    },
    // MuiListItemButton: {
    // 	styleOverrides: {
    // 		root: {
    // 			"&:hover": {
    // 				backgroundColor: "transparent",
    // 			},
    // 		},
    // 		selected: {
    // 			"&:hover": {
    // 				backgroundColor: "red",
    // 			},
    // 		},
    // 	},
    // },
    MuiGrid: {
      styleOverrides: {
        item: {
          paddingRight: "15px",
          paddingLeft: "15px",
        },
        container: {
          marginRight: "-15px",
          marginLeft: "-15px",
          width: "unset",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          width: "100%",
          marginBottom: "1rem",
          color: themeColors.gray[700],
          backgroundColor: themeColors.transparent.main,
          borderCollapse: "collapse",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: ".8125rem",
          whiteSpace: "nowrap",
          padding: "1rem",
          verticalAlign: "top",
          borderTop: "1px solid " + themeColors.gray[200],
          borderBottom: "1px solid " + themeColors.gray[200],
        },
        head: {
          padding: "1rem",
          borderTop: "1px solid " + themeColors.gray[200],
          fontWeight: 600,
          whiteSpace: "nowrap",
          verticalAlign: "bottom",
          paddingTop: ".75rem",
          paddingBottom: ".75rem",
          fontSize: ".65rem",
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "1px solid " + themeColors.gray[200],
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        input: {
          borderColor: "black",
          borderRadius: "10px",
          backgroundColor: "white",
        },
        select: {
          backgroundColor: "white",
        },
        selectRoot: {
          border: "1px solid " + themeColors.gray[200],
          borderRadius: "10px",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        },
        selectIcon: {
          color: "black",
        },
        menuItem: {
          // backgroundColor: "#ffffff",
          color: "red",
        },
        selectLabel: {
          backgroundColor: "white",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          htmlColor: "black",
          color: "primary",
        },
      },
    },
    // MuiSelect: {
    //   styleOverrides: {
    //     icon: {
    //       color: "black",
    //     },
    //     select: {
    //       "&.selected": {
    //         // this is to refer to the prop provided by M-UI
    //         backgroundColor: "white", // updated backgroundColor
    //       },
    //     },
    //   },
    // },

    // MuiMenuItem: {
    // 	// For ListItem, change this to MuiListItem
    // 	styleOverrides: {
    // 		root: {
    // 			"&$selected": {
    // 				// this is to refer to the prop provided by M-UI
    // 				backgroundColor: "white", // updated backgroundColor
    // 			},
    // 		},
    // 	},
    // },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: "white",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          width: "36px",
          height: "36px",
          fontSize: ".875rem",
          color: themeColors.gray[600],
          border: "1px solid " + themeColors.gray[300],
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: themeColors.gray[300],
          },
        },
        outlined: {
          color: themeColors.gray[600],
          border: "1px solid " + themeColors.gray[300],
          // "&:hover": {
          // 	backgroundColor: themeColors.gray[300],
          // },
        },
        // outlinedPrimary: {
        // 	"&.Mui-selected": {
        // 		"&, &:hover": {
        // 			backgroundColor: themeColors.primary.main + "!important",
        // 			color: themeColors.white.main,
        // 			boxShadow: boxShadows.buttonBoxShadow,
        // 		},
        // 	},
        // },
        sizeLarge: {
          lineHeight: "46px",
          width: "46px",
          height: "46px",
          borderRadius: "50%",
        },
        sizeSmall: {
          lineHeight: "30px",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#ffffff",
          color: "#000",
        },
      },
    },
  },

  // MuiPaper: {
  // 	styleOverrides: {
  // 		root: {
  // 			fontFamily: "'Montserrat', sans-serif",
  // 			backgroundColor: "#ffffff",
  // 			color: "#000000",
  // 			padding: "0 28px 20px 28px",
  // 			boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  // 		},
  // 	},
  // },
});

export default theme;
