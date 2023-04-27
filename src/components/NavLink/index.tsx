import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppDispatch } from "@/hooks";
import { toggleExpandNavigation } from "@/store/slices/mainNavigationSlice";

interface INavLink {
  href: string;
  exact: boolean;
  children: ReactNode;
  className?: string;
  expand?: boolean;
}

export const NavLink = ({
  href,
  exact,
  children,
  expand,
  ...props
}: INavLink): JSX.Element => {
  const dispatch = useAppDispatch();

  if (!props.className) {
    props.className = "";
  }

  const { pathname } = useRouter();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " active";
  }

  const expandHandler = () => {
    dispatch(toggleExpandNavigation(true));
  };

  return (
    <Link href={href} legacyBehavior>
      <a {...props} onClick={() => (expand ? expandHandler() : null)}>
        {children}
      </a>
    </Link>
  );
};
