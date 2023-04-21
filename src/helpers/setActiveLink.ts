export const setActiveLink = (
  pathname: string,
  url: string,
  activeClass: string
) => (pathname === url ? activeClass : "");
