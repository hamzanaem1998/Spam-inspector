import { tokens, makeStyles } from '@fluentui/react-components';

const HeaderStyles = makeStyles({
  welcome__header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: tokens.colorNeutralBackground3,
    paddingTop: "15%",
    paddingBottom: "12%",
  },
  message: {
    fontSize: "5vw",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralBackgroundStatic,
  },
  logo: {
    width: "18%",   
    height: "18%", 
  },
});

export default HeaderStyles;
