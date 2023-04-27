import { useState, ChangeEvent } from "react";
import styles from "./InputHandler.module.scss";

type InputHandlerTypes = "input" | "select";

interface InputHandlerProps {
  type: InputHandlerTypes;
  title: string;
  text?: string;
  selectOptions?: string[];
  onChange: (e: string) => void;
}

export const InputHandler = ({
  type,
  title,
  text,
  selectOptions,
  onChange,
}: InputHandlerProps): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
    if (e.target.value.length < 1) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const onSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const options = selectOptions?.map((option) => (
    <option key={option}>{option}</option>
  ));

  return (
    <div className={styles.input__handler}>
      <h6>{title}</h6>

      {type === "select" ? (
        <select onChange={(e) => onSelectChangeHandler(e)} value={value}>
          <option value="" disabled>
            Choose a typeface:
          </option>
          {options}
        </select>
      ) : (
        <>
          <input
            type="text"
            value={text ? text : value}
            placeholder="Placeholder Text"
            onChange={(e) => onInputChangeHandler(e)}
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
        </>
      )}
    </div>
  );
};
