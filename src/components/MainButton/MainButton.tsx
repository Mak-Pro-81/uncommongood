import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ReactNode } from "react";
import { useAppSelector } from "@/hooks";
import styles from "./MainButton.module.scss";
type TMainButtonType = "link" | "button";
type TMainButtonSize = "large" | "middle" | "small";
type TMainButtonColor =
  | "gray"
  | "yellow"
  | "green"
  | "blue"
  | "red"
  | "transparent";

interface IMainButton {
  type: TMainButtonType;
  children: ReactNode;
  href?: string;
  onClick: () => void;
  size?: TMainButtonSize;
  color?: TMainButtonColor;
  primaryBtn?: boolean;
  disabled?: boolean;
}

export const MainButton = ({
  type,
  children,
  href,
  onClick,
  size,
  color,
  disabled,
  primaryBtn,
  ...props
}: IMainButton): JSX.Element => {
  let buttonSize = null,
    buttonColor = null;

  const {
    selectedPalette: {
      paletteColors: [primary, secondary, accent],
    },
  } = useAppSelector((state) => state.palettes);

  switch (size) {
    case "large":
      buttonSize = styles.large;
      break;
    case "middle":
      buttonSize = styles.middle;
      break;
    case "small":
      buttonSize = styles.small;
      break;
    default:
      buttonSize = styles.default;
  }

  switch (color) {
    case "gray":
      buttonColor = styles.gray;
      break;
    case "yellow":
      buttonColor = styles.yellow;
      break;
    case "green":
      buttonColor = styles.green;
      break;
    case "blue":
      buttonColor = styles.blue;
      break;
    case "red":
      buttonColor = styles.red;
      break;
    case "transparent":
      buttonColor = styles.transparent;
      break;
  }

  return type === "link" ? (
    <Link
      href={href as Url}
      legacyBehavior
      className={`${styles.button} ${buttonSize} ${buttonColor}`}
      {...props}
      style={{ backgroundColor: primaryBtn ? accent?.colorValue : undefined }}
    >
      {children}
    </Link>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${buttonSize} ${buttonColor}`}
      disabled={disabled}
      style={{ backgroundColor: primaryBtn ? accent?.colorValue : undefined }}
      {...props}
    >
      {children}
    </button>
  );
};
