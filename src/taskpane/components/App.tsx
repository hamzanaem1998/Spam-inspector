import * as React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { makeStyles } from "@fluentui/react-components";

interface AppProps {
  title: string;
}
//ghhhhh
const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header logo="assets/logo-filled.png" title={props.title} message="DGSSI Add-in Spam inspector" />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
