import * as React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { makeStyles } from "@fluentui/react-components";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
  },
});

const App: React.FC<AppProps> = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header logo="assets/logo-filled.png" message="DGSSI Add-in for detecting email spam through AI-powered scanning" />
      <div className={styles.content}>
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default App;
