import * as React from "react";
import { Image } from "@fluentui/react-components";
import HeaderStyles from "../styles/HeaderStyles";

export interface HeaderProps {
  logo: string;
  message: string;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { logo, message } = props;
  const styles = HeaderStyles();

  return (
    <section className={styles.welcome__header}>
      <Image className={styles.logo} src={logo} alt="Logo" />
      <h1 className={styles.message}>{message}</h1>
    </section>
  );
};

export default Header;
