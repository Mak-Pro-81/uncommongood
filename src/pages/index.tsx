import { MainButton } from "@/components";
import Image from "next/image";

export default function Home() {
  const buttonClick = () => {
    console.log("click");
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
    </>
  );
}
