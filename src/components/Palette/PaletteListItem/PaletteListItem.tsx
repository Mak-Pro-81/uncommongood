import Image from "next/image";
import styles from "./PaletteListItem.module.scss";

interface PaletteListItemProps {
  title: string;
  active?: boolean;
  onClickExpand: (title: string) => void;
  onClickActive: (title: string) => void;
}

export const PaletteListItem = ({
  title,
  active,
  onClickExpand,
  onClickActive,
}: PaletteListItemProps): JSX.Element => {
  return (
    <div className={`${styles.palette__item} ${active ? styles.active : ""}`}>
      <span
        style={{ display: "inline-flex", alignItems: "center" }}
        onClick={() => onClickActive(title)}
      >
        <span className={styles.palette__item_point}></span>
        <span className={styles.palette__item_text}>{title}</span>
      </span>

      <span
        className={styles.palette__item_expand}
        onClick={() => onClickExpand(title)}
      >
        <Image
          src="/icons/angle-down.svg"
          width={12}
          height={12}
          alt="expand"
        />
      </span>
    </div>
  );
};
