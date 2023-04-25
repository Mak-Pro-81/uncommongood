import Link from "next/link";
import styles from "./ActionBox.module.scss";

interface ActionBoxProps {
  title?: string;
  box?: boolean;
  href?: string;
  linkText: string;
  onClick?: () => void;
}

export const ActionBox = ({
  title,
  box,
  href,
  linkText,
  onClick,
}: ActionBoxProps): JSX.Element => {
  return (
    <div className={styles.action__box}>
      {title && <h6>{title}</h6>}
      {box && <div className={styles.action__box_area}></div>}

      {href ? (
        <Link href={href} legacyBehavior className={styles.action__box_link}>
          {linkText}
        </Link>
      ) : (
        <button
          onClick={onClick ? onClick : () => {}}
          className={styles.action__box_link}
        >
          {linkText}
        </button>
      )}
    </div>
  );
};
