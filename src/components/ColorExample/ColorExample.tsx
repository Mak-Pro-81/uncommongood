import Image from "next/image";
import { useAppSelector } from "@/hooks";
import styles from "./ColorExample.module.scss";

import LikeIcon from "/public/icons/like.svg";
import PlusIcon from "/public/icons/plus-rounded.svg";
import DownloadIcon from "/public/icons/download.svg";
import MailIcon from "/public/icons/mail.svg";
import CalendarIcon from "/public/icons/calendar.svg";

export const ColorExample = (): JSX.Element => {
  const {
    selectedPalette: {
      paletteColors: [primary, secondary, accent],
    },
  } = useAppSelector((state) => state.palettes);

  return (
    <div className={styles.color__example}>
      <h4>Example assets</h4>
      <div className={styles.color__example_elements}>
        <span
          className={styles.button}
          style={{ backgroundColor: primary?.colorValue }}
        >
          Donate
        </span>
        <ul className={styles.icons__list}>
          <li>
            <LikeIcon fill={primary?.colorValue} />
          </li>
          <li>
            <PlusIcon fill={primary?.colorValue} />
          </li>
          <li>
            <DownloadIcon fill={primary?.colorValue} />
          </li>
          <li>
            <MailIcon fill={primary?.colorValue} />
          </li>
          <li>
            <CalendarIcon fill={primary?.colorValue} />
          </li>
        </ul>
      </div>
      <div className={styles.color__example_banner}>
        <Image
          src="/images/example-img.jpg"
          alt="example"
          fill
          objectFit="cover"
        />
        <div className={styles.color__example_banner_title}>
          <span style={{ backgroundColor: primary?.colorValue }}></span>
          <h4>Support Troop 15 - Boy Scouts of America</h4>
        </div>
      </div>
    </div>
  );
};
