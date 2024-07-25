import * as React from "react";
import { Button, makeStyles } from "@fluentui/react-components";
import { getScore } from "../utils/taskpane";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  button: {
    marginBottom: "10px",
  },
});

const Body: React.FC = () => {
  const styles = useStyles();

  const handleGetScore = async () => {
    try {
      await getScore();
    } catch (error) {
      console.error("Failed to get score:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={handleGetScore}>
        Get score
      </Button>
    </div>
  );
};

export default Body;
