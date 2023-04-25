import { createPortal } from "react-dom";
import { MainButton } from "@/components";
import Image from "next/image";
import { Modal } from "@/components";

import { useAppSelector, useAppDispatch } from "@/hooks";
import { toggleModal } from "@/store/slices/modalSlice";

export default function Home() {
  const { showModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const buttonClick = () => {
    dispatch(toggleModal(true));
  };

  return (
    <>
      <h2>Home Page</h2>
      <MainButton type="button" onClick={buttonClick}>
        Link Button{" "}
        <Image
          src="/icons/promote.svg"
          width={11.72}
          height={6.66}
          alt="icon"
          style={{ marginLeft: "1rem" }}
        />
      </MainButton>

      {showModal && createPortal(<Modal>Modal Content</Modal>, document.body)}
    </>
  );
}
