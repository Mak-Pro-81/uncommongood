import Link from "next/link";
import Image from "next/image";
import styles from "./MainNav.module.scss";
import { MainMenuItem } from "../MainMenuItem/MainMenuItem";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const MainNav = (): JSX.Element => {
  const { pathname } = useRouter();
  const [secondaryMenuItems, setSecondaryMenuItems] = useState<string[]>([
    "Branding",
    "Logos",
    "Colors",
    "Typography",
  ]);

  return (
    <nav className={styles.main__nav}>
      <div className={styles.main__nav_primary}>
        <div className={styles.main__nav_logo}>
          <Link href="/">
            <Image
              src={"/icons/logo.svg"}
              width={49.99}
              height={45.91}
              alt="logo"
            />
          </Link>
        </div>
        <ul>
          <li>
            <MainMenuItem
              href="/"
              icon="/icons/home.svg"
              iconWidth={20}
              iconHeight={19.39}
              text="Home"
            />
          </li>
          <li>
            <MainMenuItem
              href="/sweepstakes"
              icon="/icons/sweepstakes.svg"
              iconWidth={20}
              iconHeight={17.58}
              text="Sweepstakes"
            />
          </li>
          <li>
            <MainMenuItem
              href="/settings"
              icon="/icons/settings.svg"
              iconWidth={20}
              iconHeight={19.99}
              text="Settings"
            />
          </li>
        </ul>
      </div>
      <div className={styles.main__nav_secondary}>
        <div>
          <ul>
            {secondaryMenuItems.map((item) => (
              <li key={item}>
                <Link href={`/settings/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
