/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect, useState } from "react";
import { Link, useResolvedPath, useTransition } from "remix";

function useIsPendingPathname(to: string) {
  let { location } = useTransition();
  let { pathname } = useResolvedPath(to);
  return location?.pathname === pathname;
}

function useIsSlowTransition(ms = 300) {
  let transition = useTransition();
  let [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    if (transition.state === "loading") {
      let id = setTimeout(() => setIsSlow(true), ms);
      return () => clearTimeout(id);
    } else {
      setIsSlow(false);
    }
  }, [transition, ms]);

  return isSlow;
}

export const PendingLink = ({ to, style, ...props }) => {
  let isSlow = useIsSlowTransition(300);
  let isPending = useIsPendingPathname(to);

  return (
    <Link
      style={{ ...style, opacity: isPending && isSlow ? 0.33 : 1 }}
      to={to}
      {...props}
    />
  );
};
