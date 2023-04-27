import { useEffect } from "react";
import { ReactNode } from "react";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { MainNav } from "../MainNav/MainNav";
import { useAppSelector } from "@/hooks";

import styles from "./Layout.module.scss";

interface ILayout {
  children: ReactNode;
  classes?: string;
}

export const Layout = ({ classes, children }: ILayout): JSX.Element => {
  const { bodyFont, headerFont, subHeaderFont } = useAppSelector(
    (state) => state.typography
  );

  useEffect(() => {
    console.log(bodyFont, headerFont, subHeaderFont);
  }, [bodyFont, headerFont, subHeaderFont]);

  return (
    <>
      <div className={`${classes} ${styles.layout}`}>
        <div className={styles.layout__sidebar}>
          <MainNav />
        </div>
        <div className={styles.layout__content}>{children}</div>
      </div>
      <GlobalStyle
        bodyFont={bodyFont}
        headerFont={headerFont}
        subHeaderFont={subHeaderFont}
      />
    </>
  );
};
