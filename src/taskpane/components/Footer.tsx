import * as React from "react";
import FooterStyles from "../styles/FooterStyles";

const Footer: React.FC = () => {
  const styles = FooterStyles();
  return <div className={styles.footer}>Copyright © 2024 All rights reserved | DGSSI</div>;
};

export default Footer;
