import * as React from "react";
import FooterStyles from "../styles/FooterStyles";

const Footer: React.FC = () => {
  const styles = FooterStyles();
  return <div className={styles.footer}>Copyright © 2024 DGSSI All rights reserved.</div>;
};

export default Footer;
