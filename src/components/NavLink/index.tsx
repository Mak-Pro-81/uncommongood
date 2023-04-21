import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface INavLink {
  href: string;
  exact: boolean;
  children: ReactNode;
  className?: string;
}

export const NavLink = ({
  href,
  exact,
  children,
  ...props
}: INavLink): JSX.Element => {
  if (!props.className) {
    props.className = "";
  }

  console.log(props.className);

  const { pathname } = useRouter();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " active";
  }

  return (
    <Link href={href} legacyBehavior>
      <a {...props}>{children}</a>
    </Link>
  );
};
