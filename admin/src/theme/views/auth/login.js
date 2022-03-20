import themeColors from "../../colors";
import boxShadows from "./../../box-shadow";

const componentStyles = (theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
    backgroundColor: themeColors.secondary.main,
  },
  cardHeader: {
    backgroundColor: "initial",
  },
  cardContent: {
    [theme.breakpoints.up("md")]: {
      padding: "3rem",
    },
  },
  buttonImg: {
    verticalAlign: "middle",
    borderStyle: "none",
  },
  buttonRoot: {
    backgroundColor: themeColors.white.main,
    color: themeColors.primary.main,
    boxShadow: boxShadows.buttonBoxShadowNeutral,
    borderColor: themeColors.white.main + "!important",
    "&:hover": {
      color: themeColors.gray[900],
      borderColor: themeColors.white.main + "!important",
      backgroundColor: themeColors.white.main,
    },
  },
  formControlLabelRoot: {
    position: "relative",
    display: "flex",
    minHeight: "1.5rem",
    WebkitPrintColorAdjust: "exact",
  },
  formControlLabelLabel: {
    cursor: "pointer",
    fontSize: ".875rem",
    position: "relative",
    verticalAlign: "top",
    display: "inline-block",
    color: themeColors.gray[600],
  },
  footerLinks: {
    color: themeColors.gray[400],
    textDecoration: "none",
  },
});

export default componentStyles;
