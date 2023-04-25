import Image from "next/image";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
  text: string;
}

export const Tooltip = ({ text }: TooltipProps) => {
  return (
    <span className={styles.tooltip}>
      <Image src={"/icons/i.svg"} width={2.15} height={9.5} alt="info" />
      <i>{text}</i>
    </span>
  );
};
