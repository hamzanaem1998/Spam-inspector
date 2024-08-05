import { tokens, makeStyles } from '@fluentui/react-components';

const HeaderStyles = makeStyles({
    welcome__header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // Center content vertically
      textAlign: "center",      // Center text horizontally
      paddingBottom: "30px",
      paddingTop: "50px",
      backgroundColor: tokens.colorNeutralBackground3,
    },
    message: {
      fontSize: tokens.fontSizeBase400,
      fontWeight: tokens.fontWeightRegular,
      color: tokens.colorNeutralBackgroundStatic,
    },
  });

export default HeaderStyles;
