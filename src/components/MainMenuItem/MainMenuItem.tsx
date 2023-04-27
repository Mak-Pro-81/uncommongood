import { NavLink } from "../NavLink";
import styles from "./MainMenuItem.module.scss";
import { setActiveLink } from "@/helpers";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface MainMenuItemProps {
  href: string;
  icon?: ReactNode;
  text: string;
  color?: string;
  expand?: boolean;
}

export const MainMenuItem = ({
  href,
  icon,
  text,
  color,
  expand,
}: MainMenuItemProps): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <NavLink
      href={href}
      exact
      expand={expand}
      className={`${styles.menu__item} ${setActiveLink(
        pathname,
        href,
        styles.active
      )}`}
    >
      <span className={styles.menu__item_icon}>{icon}</span>
      <span style={{ color: color }}>{text}</span>
    </NavLink>
  );
};
