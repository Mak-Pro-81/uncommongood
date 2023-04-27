import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useDropzone, FileWithPath } from "react-dropzone";
import prettyBytes from "pretty-bytes";
import { MainButton } from "@/components";
import { useAppDispatch } from "@/hooks";
import { toggleModal } from "@/store/slices/modalSlice";
import { setImages, fetchImages } from "@/store/slices/imagesSlice";
import styles from "./Dropzone.module.scss";

type ImageFile = {
  name: string;
  preview: string;
};

export const Dropzone = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [empty, setEmpty] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileWithPath[]>([]);
  const [sendData, setSendData] = useState<boolean>(false);

  const maxSize = 3145728;

  const fileValidator = (file: FileWithPath) => {
    if (file.size > maxSize) {
      setError(true);
    }
    return null;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: { file: FileWithPath }[]) => {
      const errorFiles: FileWithPath[] = [];
      fileRejections.forEach((obj) => {
        errorFiles.push(obj.file);
      });
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles,
        ...errorFiles,
      ]);
      setEmpty(false);
    },
    []
  );

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/svg/png/jpg/jpeg": [".svg", ".png", ".jpg", ".jpeg"],
      },
      maxSize,
      onDrop,
      validator: fileValidator,
    });

  useEffect(() => {
    let data = uploadedFiles.map((file: FileWithPath) => {
      return {
        name: file.path as string,
        preview: URL.createObjectURL(file),
      };
    });
    const uniqueFiles = uploadedFiles.filter(
      (obj, index) => data.findIndex((o) => o.name === obj.name) === index
    );
    setFilteredFiles(uniqueFiles);
  }, [uploadedFiles]);

  const confirmHandler = () => {
    setSendData(true);
  };

  const cancelHandler = () => {
    setEmpty(true);
    setSendData(false);
    dispatch(toggleModal(false));
  };

  useEffect(() => {
    if (sendData) {
      const data = filteredFiles.map((file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
      }));

      fetch("https://630f034d498924524a83f7ef.mockapi.io/uploadedImages", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      }).then(() => {
        setSendData(false);
        fetch("https://630f034d498924524a83f7ef.mockapi.io/uploadedImages")
          .then((res) => res.json())
          .then((data) => {
            const allObjects: any[] = [];

            data.forEach((obj: ImageFile) => {
              allObjects.push(...Object.values(obj));
            });
            const sliced = allObjects.filter((obj) => typeof obj !== "string");
            const uniqueImages = sliced
              .filter(
                (obj, index) =>
                  sliced.findIndex((o) => o.name === obj.name) === index
              )
              .map((image) => image.preview);
            dispatch(setImages(uniqueImages));
            dispatch(fetchImages());
            setImages(uniqueImages);
            setSendData(false);
            dispatch(toggleModal(false));
          });
      });
    }
  }, [sendData]);

  const filteredFileItems = filteredFiles.map((file: FileWithPath) => {
    return (
      <li key={file.path}>
        <div>
          {file.size < maxSize ? (
            <span>
              <Image
                src={"/icons/accept.svg"}
                width={10}
                height={8}
                alt="passed"
              />
            </span>
          ) : (
            <span style={{ backgroundColor: "#C53F30" }}>
              <Image
                src={"/icons/decline.svg"}
                width={6.24}
                height={6.24}
                alt="passed"
              />
            </span>
          )}

          {file.name}
        </div>
        <div>{prettyBytes(file.size).toUpperCase()}</div>
      </li>
    );
  });

  return (
    <div className={styles.dropzone}>
      <h2 className={styles.dropzone__title}>Upload Logos</h2>
      {empty ? (
        <div {...getRootProps({ className: styles.dropzone__area })}>
          <input {...getInputProps()} />
          <div>
            <Image
              src="/icons/upload.svg"
              width={50}
              height={56}
              alt="upload"
            />
            <span>Click to upload or drag images into this space.</span>
          </div>
        </div>
      ) : (
        <div className={styles.dropzone__result}>
          <ul>{filteredFileItems}</ul>

          {error && (
            <p>
              One or more files above are invalid. Please review and confirm
              that they are valid file types and are below 3MB. To ignore and
              continue, hit ‘Confirm.’
            </p>
          )}

          <button
            className={styles.dropzone__more}
            onClick={() => setEmpty(true)}
          >
            Upload more images
          </button>
        </div>
      )}
      <div className={styles.dropzone__actions}>
        <ul>
          <li>
            <MainButton
              type="button"
              size="middle"
              color="transparent"
              onClick={cancelHandler}
            >
              Cancel
            </MainButton>
          </li>
          <li>
            <MainButton
              type="button"
              size="middle"
              color="yellow"
              onClick={confirmHandler}
              primaryBtn
              disabled={empty}
            >
              Confirm
            </MainButton>
          </li>
        </ul>
      </div>
    </div>
  );
};
