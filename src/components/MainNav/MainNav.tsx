import Link from "next/link";
import Image from "next/image";
import styles from "./MainNav.module.scss";
import { MainMenuItem } from "../MainMenuItem/MainMenuItem";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { toggleExpandNavigation } from "@/store/slices/mainNavigationSlice";

import HomeIcon from "/public/icons/home.svg";
import SweepstakesIcon from "public/icons/sweepstakes.svg";
import SettingsIcon from "public/icons/settings.svg";

export const MainNav = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    selectedPalette: {
      paletteColors: [primary, secondary, accent],
    },
  } = useAppSelector((state) => state.palettes);

  const { expandNav } = useAppSelector((state) => state.mainnavigation);

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
              icon={<HomeIcon fill={primary?.colorValue} />}
              text="Home"
              color={primary?.colorValue}
            />
          </li>
          <li>
            <MainMenuItem
              href="/sweepstakes"
              icon={<SweepstakesIcon fill={primary?.colorValue} />}
              text="Sweepstakes"
              color={primary?.colorValue}
            />
          </li>
          <li>
            <MainMenuItem
              href="/settings"
              icon={<SettingsIcon fill={primary?.colorValue} />}
              text="Settings"
              color={primary?.colorValue}
              expand
            />
          </li>
        </ul>
      </div>

      {expandNav && (
        <div
          className={styles.main__nav_secondary}
          style={{ backgroundColor: secondary?.colorValue }}
        >
          <button
            className={styles.main__nav_secondary_close}
            onClick={() => dispatch(toggleExpandNavigation(false))}
          >
            Close
          </button>

          <div>
            <ul>
              {secondaryMenuItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`/settings/${item.toLowerCase()}`}
                    style={{ color: primary?.colorValue }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
