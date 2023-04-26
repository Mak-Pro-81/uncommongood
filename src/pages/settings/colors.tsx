import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setPalettes, setOldPaletteName } from "@/store/slices/palettesSlice";
import Link from "next/link";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import {
  ActionBox,
  PaletteCreate,
  PaletteUploader,
  PaletteListItem,
  MainButton,
} from "@/components";
import {
  ColorTypes,
  Palette,
  PaletteColor,
} from "@/store/slices/palettesSlice";

const OrganizationColorsPage = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { palettes } = useAppSelector((state) => state.palettes);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [paletteName, setPaletteName] = useState<string>("");
  const [paletteColors, setPaletteColors] = useState<PaletteColor[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [selectedPaletteItem, setSelectedPaletteItem] = useState<string>(
    palettes[0]?.paletteName || ""
  );

  const paletteColorsHandler = (type: ColorTypes, color: { hex: string }) => {
    const paletteColor = {
      colorName: type,
      colorValue: color.hex,
    };

    const objIndex = paletteColors.findIndex((obj) => obj.colorName === type);

    if (objIndex !== -1) {
      const newPaletteColors = [...paletteColors];
      newPaletteColors[objIndex] = paletteColor;
      setPaletteColors(newPaletteColors);
    } else {
      setPaletteColors((prev) => [...prev, paletteColor]);
    }
  };

  const createPaletteHandler = () => {
    setPaletteName("");
    setPaletteColors([]);
    setShowCreate(true);
  };

  const saveHandler = () => {
    const palette: Palette = {
      paletteName,
      paletteColors,
    };

    dispatch(setPalettes(palette));
    setShowCreate(false);
    setCompleted(false);
    setSelectedPaletteItem("");
  };

  const paletteItemClickHandler = (value: string) => {
    dispatch(setOldPaletteName(value));
    setCompleted(true);
    setSelectedPaletteItem(value);
    setShowCreate(true);

    const objIndex = palettes.findIndex((obj) => obj.paletteName === value);
    setPaletteColors(palettes[objIndex].paletteColors);
    setPaletteName(palettes[objIndex].paletteName);
  };

  useEffect(() => {
    if (
      Object.values(ColorTypes).length === paletteColors.length &&
      paletteName !== ""
    ) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [paletteName, paletteColors]);

  const palettesList = palettes.map((palette) => (
    <li key={palette.paletteName} style={{ marginBottom: "3rem" }}>
      <PaletteListItem
        title={palette.paletteName}
        onClick={(value) => paletteItemClickHandler(value)}
        active={palette.paletteName === selectedPaletteItem}
      />
    </li>
  ));

  const colorTypes = Object.values(ColorTypes).map((type, index) => {
    const selectedIndex = palettes.findIndex(
      (obj) => obj.paletteName === selectedPaletteItem
    );

    return (
      <PaletteUploader
        key={type}
        type={type}
        initialcolor={
          palettes &&
          `${
            paletteColors.length > 0
              ? palettes[selectedIndex]?.paletteColors[index].colorValue
              : "#00010"
          }`
        }
        setColorHandler={(type, color) => paletteColorsHandler(type, color)}
      />
    );
  });

  const base = "/settings";
  const breadcrumbs = router.pathname.split("/").map((crumb) => {
    if (`/${crumb}` === base) {
      return (
        crumb.length > 0 && (
          <li key={crumb}>
            <Link href={"/settings"}>{`Organization ${crumb} > `}</Link>
          </li>
        )
      );
    }

    return (
      crumb.length > 0 && (
        <li key={crumb}>
          <Link href={`${base}/${crumb}`}>{`${crumb} > `}</Link>
        </li>
      )
    );
  });

  return (
    <>
      <ul style={{ display: "inline-flex" }}>{breadcrumbs}</ul>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="page__title">Colors</h2>
        <MainButton
          type="button"
          size="middle"
          color="yellow"
          onClick={saveHandler}
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
            Your Palette <Tooltip text="Colors" />
          </h4>
          <p>
            Colors make your organization unique. Your brand’s palette is made
            up of 3 colors: Primary, Secondary, and Accent.
          </p>
          <br />

          {!showCreate && (
            <>
              <ul>{palettesList}</ul>
              <br />
              <ActionBox
                title="Brand Logos"
                box
                linkText="Create a New Palette"
                onClick={createPaletteHandler}
              />
            </>
          )}

          {showCreate && (
            <>
              <PaletteCreate
                text={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
              />
              <br />
              {colorTypes}
            </>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default OrganizationColorsPage;
