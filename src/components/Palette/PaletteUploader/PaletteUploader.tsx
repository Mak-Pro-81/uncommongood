import { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import styles from "./PaletteUploader.module.scss";
import { ColorTypes } from "@/store/slices/palettesSlice";
import hexRgb from "hex-rgb";

interface PaletteUploaderProps {
  type: ColorTypes;
  initialcolor?: string;
  setColorHandler: (type: ColorTypes, color: ColorResult) => void;
}

export const PaletteUploader = ({
  type,
  initialcolor,
  setColorHandler,
}: PaletteUploaderProps) => {
  const [displayPicker, setDisplayPicker] = useState<boolean>(false);
  const [color, setColor] = useState<any>("");

  const initialRGB = hexRgb("#0001");

  const showPalette = () => {
    setDisplayPicker((prev) => !prev);
  };

  const onChange = (color: ColorResult) => {
    setColor(color);
    setColorHandler(type, color);
  };

  return (
    <div
      className={`${styles.palette__uploader} ${
        displayPicker ? styles.active : ""
      }`}
    >
      <div className={styles.palette__uploader_action}>
        <div className={styles.palette__uploader_color} onClick={showPalette}>
          <span className={styles.palette__uploader_stub}></span>
          {(color || initialcolor) && (
            <span
              className={styles.palette__uploader_result}
              style={{ backgroundColor: `${color ? color.hex : initialcolor}` }}
            ></span>
          )}
        </div>
        <span className={styles.palette__uploader_type}>{type}</span>
        {displayPicker && (
          <div className={styles.palette__uploader_picker}>
            <div className={styles.palette__uploader_picker_close}>
              <button onClick={() => setDisplayPicker(false)}>X</button>
            </div>

            <SketchPicker
              color={color}
              onChange={(color) => onChange(color)}
              onChangeComplete={() => {}}
            />
          </div>
        )}
      </div>
      <div className={styles.palette__uploader_info}>
        {(color || initialcolor) && (
          <>
            <span>{(color && color.hex) || initialcolor}</span>
            <span>
              RGB: {(color && color.rgb.r) || initialRGB.red},{" "}
              {(color && color.rgb.g) || initialRGB.green},{" "}
              {(color && color.rgb.b) || initialRGB.blue}
            </span>
          </>
        )}
        <span>
          This color will affect [{type}] and [{type}]
        </span>
      </div>
    </div>
  );
};
