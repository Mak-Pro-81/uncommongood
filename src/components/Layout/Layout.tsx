import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { setActiveLink } from "@/helpers";

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
        <ul>
          <li>
            <Link
              href="/"
              className={setActiveLink(pathname, "/", styles.active)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/sweepstakes"
              className={setActiveLink(pathname, "/sweepstakes", styles.active)}
            >
              Sweepstakes
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.layout__content}>{children}</div>
    </div>
  );
};
