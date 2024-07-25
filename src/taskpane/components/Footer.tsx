import * as React from "react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  scoreText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
});

const Footer: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <p className={styles.scoreText}>Score est :</p>
    </div>
  );
};

export default Footer;
