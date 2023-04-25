import { useRouter } from "next/router";
import Link from "next/link";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { ActionBox } from "@/components";

const OrganizationColorsPage = (): JSX.Element => {
  const router = useRouter();
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
      <h2 className="page__title">Colors</h2>
      <div className="constructor__area">
        <div>
          <h4 style={{ display: "inline-flex", alignItems: "center" }}>
            <br />
            Your Palette <Tooltip text="Colors" />
          </h4>
          <p>
            Colors make your organization unique. Your brand’s palette is made
            up of 3 colors: Primary, Secondary, and Accent.
          </p>
          <ActionBox
            title="Brand Logos"
            box
            linkText="Create a New Palette"
            onClick={() => {}}
          />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default OrganizationColorsPage;
