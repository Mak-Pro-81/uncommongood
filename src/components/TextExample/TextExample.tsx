import styles from "./TextExample.module.scss";

interface TextExampleProps {
  title?: string;
  subTitle?: string;
  text?: string;
}

export const TextExample = ({ title, subTitle, text }: TextExampleProps) => {
  return (
    <div className={styles.text__example}>
      {title && <h2>{title}</h2>}
      {subTitle && <h4>{subTitle}</h4>}
      {text && <p>{text}</p>}
    </div>
  );
};
