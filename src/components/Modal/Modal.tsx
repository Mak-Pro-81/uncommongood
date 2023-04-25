import Image from "next/image";
import styles from "./Modal.module.scss";
import { ReactNode } from "react";
import { useAppDispatch } from "@/hooks";
import { toggleModal } from "@/store/slices/modalSlice";

type TModal = "small" | "medium" | "large" | "full";

interface IModal {
  children?: ReactNode;
  type?: TModal;
}

export const Modal = ({ children, type }: IModal): JSX.Element => {
  const dispatch = useAppDispatch();

  let contentClass: string = styles.small;

  switch (type) {
    case "small":
      contentClass = styles.modal__window_content_inner_small;
      break;
    case "medium":
      contentClass = styles.medium;
      break;
    case "large":
      contentClass = styles.large;
      break;
    case "full":
      contentClass = styles.full;
      break;
    default:
      contentClass = styles.small;
  }

  return (
    <div className={styles.modal__window}>
      <div className={`${styles.modal__window_content} ${contentClass}`}>
        <button
          className={styles.modal__close}
          onClick={() => dispatch(toggleModal(false))}
        >
          <Image src="/icons/decline.svg" width={14} height={14} alt="close" />
        </button>
        <div className={`${styles.modal__window_content_inner}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
