import { CopyToClipboard } from "react-copy-to-clipboard";
import { MainButton } from "../../components";
import { SweepstakesModalContentType } from "@/types";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { toggleModal } from "@/store/slices/modalSlice";
import { toggleCopy } from "@/store/slices/clipboardSlice";
import Image from "next/image";

import styles from "./SweepstakesModalContent.module.scss";

interface SweepstakesModalContentProps {
  id?: string;
  type: SweepstakesModalContentType;
  link?: string;
  statusClick?: (value: string) => void;
}

export const SweepstakesModalContent = ({
  id,
  type,
  link,
  statusClick,
}: SweepstakesModalContentProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { copied } = useAppSelector((state) => state.clipboard);

  const buttonsListStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  let content = <></>;

  switch (type) {
    case "publish":
      content = (
        <div className={styles.content}>
          <h4>Publish shareable link</h4>
          <div className={styles.clipboard__link}>{link}</div>
          <ul style={buttonsListStyle}>
            <li>
              <MainButton
                type="button"
                size="large"
                color="gray"
                onClick={() => dispatch(toggleModal(false))}
              >
                Cancel
              </MainButton>
            </li>
            <li>
              <CopyToClipboard
                text={link as string}
                onCopy={() => {
                  dispatch(toggleCopy(true));
                  setTimeout(() => {
                    dispatch(toggleCopy(false));
                  }, 1000);
                }}
              >
                <MainButton
                  type="button"
                  size="large"
                  color={copied ? "green" : "yellow"}
                  onClick={() => {}}
                >
                  {!copied && (
                    <Image
                      src="/icons/link.svg"
                      width={11.72}
                      height={6.66}
                      alt="copy link"
                      style={{ marginRight: "1rem" }}
                    />
                  )}

                  {copied ? "Saved!" : "Copy Link"}
                </MainButton>
              </CopyToClipboard>
            </li>
          </ul>
        </div>
      );
      break;
    case "accept":
      content = (
        <div className={styles.content}>
          <h4>Accept</h4>
          <p>
            Are you sure you want to accept this sweepstake? You can accept it
            when you’re ready.
          </p>
          <ul style={buttonsListStyle}>
            <li>
              <MainButton
                type="button"
                size="large"
                color="gray"
                onClick={() => dispatch(toggleModal(false))}
              >
                Cancel
              </MainButton>
            </li>
            <li>
              <MainButton
                type="button"
                size="large"
                color="yellow"
                onClick={() => (statusClick ? statusClick(id as string) : {})}
              >
                Accept
              </MainButton>
            </li>
          </ul>
        </div>
      );
      break;
    default:
      content = <></>;
  }

  return content;
};
