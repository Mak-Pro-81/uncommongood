import { useState, ChangeEvent } from "react";
import styles from "./PaletteCreate.module.scss";

interface PaletteCreateProps {
  text?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PaletteCreate = ({
  text,
  onChange,
}: PaletteCreateProps): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
    if (e.target.value.length < 1) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className={styles.palette__create}>
      <h6>Palette Name</h6>
      <input
        type="text"
        value={text ? text : value}
        placeholder="Placeholder Text"
        onChange={(e) => onChangeHandler(e)}
      />
      {error && (
        <span
          style={{
            fontSize: "1.4rem",
            color: "tomato",
            display: "block",
            padding: "0 2.5rem",
            marginTop: "0.5rem",
          }}
        >
          Please Enter name
        </span>
      )}
    </div>
  );
};
