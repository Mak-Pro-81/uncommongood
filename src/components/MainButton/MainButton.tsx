import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./MainButton.module.scss";
type TMainButtonType = "link" | "button";
type TMainButtonSize = "large" | "small";

interface IMainButton {
  type: TMainButtonType;
  children: ReactNode;
  href?: string;
  onClick: () => void;
  size?: TMainButtonSize;
}

export const MainButton = ({
  type,
  children,
  href,
  onClick,
  size,
  ...props
}: IMainButton): JSX.Element => {
  let buttonSize = null;

  switch (size) {
    case "large":
      buttonSize = styles.large;
      break;
    case "small":
      buttonSize = styles.small;
      break;
    default:
      buttonSize = styles.default;
  }

  return type === "link" ? (
    <Link
      href={href as Url}
      legacyBehavior
      className={`${styles.button} ${buttonSize}`}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${buttonSize}`}
      {...props}
    >
      {children}
    </button>
  );
};
