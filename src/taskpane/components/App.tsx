import * as React from "react";
import { makeStyles } from "@fluentui/react-components";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    height: "100vh", 
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "25%", /* 30% of the parent container's height */
    // backgroundColor: "red",
    display: "flex", /* Enables flexbox layout */
    justifyContent: "center", /* Centers items horizontally (optional) */
    alignItems: "center" /* Centers items vertically */
  },
  body: {
    height: "65%",
    backgroundColor: "white",
  },
  footer: {
    height: "10%", // 10% de la hauteur du conteneur parent
    // backgroundColor: "blue",
    display: "flex", /* Enables flexbox layout */
    justifyContent: "center", /* Centers items horizontally (optional) */
    alignItems: "center" /* Centers items vertically */
  },
});

const App: React.FC<AppProps> = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header logo="assets/logo-filled.png" message="DGSSI Add-in for detecting email spam through AI-powered scanning" />
      </div>
      <div className={styles.body}>
        <Body />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
