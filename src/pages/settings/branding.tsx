import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Modal, ActionBox, Dropzone } from "@/components";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { toggleModal } from "@/store/slices/modalSlice";
import { fetchImages } from "@/store/slices/imagesSlice";

const OrganizationBrandingPage = (): JSX.Element => {
  const { showModal } = useAppSelector((state) => state.modal);
  const { fetchedImages, images, status } = useAppSelector(
    (state) => state.images
  );
  const [uniqueImages, setUniqueImages] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  }, []);

  useEffect(() => {
    const allObjects: any[] = [];

    fetchedImages.forEach((obj) => {
      allObjects.push(...Object.values(obj));
    });
    const sliced = allObjects.filter((obj) => typeof obj !== "string");
    const uniqueImages = sliced
      .filter(
        (obj, index) => sliced.findIndex((o) => o.name === obj.name) === index
      )
      .map((image) => image.preview);
    setUniqueImages(uniqueImages);
  }, [status, showModal]);

  return (
    <>
      {status === "resolved" && (
        <ul>
          {uniqueImages.map((image, index) => (
            <li key={index}>{image}</li>
          ))}
        </ul>
      )}
      <h2 className="page__title">Organization Branding</h2>
      <br />
      <div className="uloaded__items"></div>
      <ActionBox
        title="Brand Logos"
        box
        linkText="Upload new logo"
        onClick={() => dispatch(toggleModal(true))}
      />

      <br />

      {showModal &&
        createPortal(
          <Modal>
            <Dropzone />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default OrganizationBrandingPage;
