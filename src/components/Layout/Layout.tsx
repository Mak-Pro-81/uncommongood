import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { setActiveLink } from "@/helpers";
import { MainNav } from "../MainNav/MainNav";

import styles from "./Layout.module.scss";

interface ILayout {
  children: ReactNode;
  classes: string;
}

export const Layout = ({ classes, children }: ILayout): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <div className={`${classes} ${styles.layout}`}>
      <div className={styles.layout__sidebar}>
        <MainNav />
      </div>
      <div className={styles.layout__content}>{children}</div>
    </div>
  );
};
