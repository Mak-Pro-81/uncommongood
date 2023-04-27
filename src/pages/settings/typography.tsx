import { useEffect, useState, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import {
  setHeaderFont,
  setSubHeaderFont,
  setBodyFont,
} from "@/store/slices/typographySlice";
import { MainButton, Tooltip, TextExample, InputHandler } from "@/components";
import { TFonts } from "@/store/slices/typographySlice";

const OrganizationTypographysPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { availableFonts } = useAppSelector((state) => state.typography);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    selectedCount === 3 && setCompleted(true);
  }, [selectedCount]);

  const submitHandler = () => {
    console.log("send for save");
  };

  return (
    <>
      <h2>Organization Typography</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="page__title">Typography</h2>
        <MainButton
          type="button"
          size="middle"
          color="yellow"
          onClick={submitHandler}
          disabled={!completed}
        >
          Save Changes
        </MainButton>
      </div>

      <br />

      <div className="constructor__area">
        <div>
          <h4
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            <br />
            Typefaces, fonts <Tooltip text="Typography" />
          </h4>
          <p>
            Your organization’s typefaces live here and affect how your pages
            appear on the UncommonGood platform.
          </p>
          <br />

          <InputHandler
            title="Header"
            type="select"
            onChange={(e) => {
              setSelectedCount((prev) => (prev += 1));
              dispatch(setHeaderFont(e as TFonts));
            }}
            selectOptions={availableFonts}
          />
          <br />
          <InputHandler
            title="Sub-Header"
            type="select"
            onChange={(e) => {
              setSelectedCount((prev) => (prev += 1));
              dispatch(setSubHeaderFont(e as TFonts));
            }}
            selectOptions={availableFonts}
          />
          <br />
          <InputHandler
            title="Body Copy"
            type="select"
            onChange={(e) => {
              setSelectedCount((prev) => (prev += 1));
              dispatch(setBodyFont(e as TFonts));
            }}
            selectOptions={availableFonts}
          />
        </div>
        <div>
          <h4
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            <br />
            Example type pairings
          </h4>

          <br />
          <br />

          <TextExample
            title="Article Heading"
            subTitle="Article Subheading goes here"
            text="Body copy: Lorem ipsum dolor sit amet, consectetur adipiscing elit. At eget iaculis eget eget neque, posuere quis placerat arcu. Ipsum est felis varius faucibus praesent convallis."
          />

          <TextExample
            title="Article Heading"
            text="Body copy: Lorem ipsum dolor sit amet, consectetur adipiscing elit. At eget iaculis eget eget neque, posuere quis placerat arcu. Ipsum est felis varius faucibus praesent convallis."
          />
          <TextExample
            subTitle="Article Subheading goes here"
            text="Body copy: Lorem ipsum dolor sit amet, consectetur adipiscing elit. At eget iaculis eget eget neque, posuere quis placerat arcu. Ipsum est felis varius faucibus praesent convallis."
          />
        </div>
      </div>
    </>
  );
};

export default OrganizationTypographysPage;
