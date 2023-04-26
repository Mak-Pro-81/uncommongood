import styles from "./PaletteListItem.module.scss";

interface PaletteListItemProps {
  title: string;
  active?: boolean;
  onClick: (title: string) => void;
}

export const PaletteListItem = ({
  title,
  active,
  onClick,
}: PaletteListItemProps): JSX.Element => {
  return (
    <div
      className={`${styles.palette__item} ${active ? styles.active : ""}`}
      onClick={() => onClick(title)}
    >
      <span className={styles.palette__item_point}></span>
      <span className={styles.palette__item_text}>{title}</span>
    </div>
  );
};
