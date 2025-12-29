import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPath = useRef<string>(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    prevPath.current = pathname;
  }, [pathname, prevPath]);

  return null;
};

export default ScrollToTop;
