import { NavLink } from "../NavLink";
import Image from "next/image";
import styles from "./MainMenuItem.module.scss";
import { setActiveLink } from "@/helpers";
import { useRouter } from "next/router";

interface MainMenuItemProps {
  href: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  text: string;
}

export const MainMenuItem = ({
  href,
  icon,
  iconWidth,
  iconHeight,
  text,
}: MainMenuItemProps): JSX.Element => {
  const { pathname } = useRouter();
  return (
    <NavLink
      href={href}
      exact
      className={`${styles.menu__item} ${setActiveLink(
        pathname,
        href,
        styles.active
      )}`}
    >
      <span className={styles.menu__item_icon}>
        <Image src={icon} width={iconWidth} height={iconHeight} alt="icon" />
      </span>
      <span>{text}</span>
    </NavLink>
  );
};
