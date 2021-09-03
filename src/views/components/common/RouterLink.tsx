import React from "react";
import { Link } from "react-router-dom";

export default function RouterLink(to: string) {
  return React.forwardRef<HTMLInputElement, any>((props, ref) => (
    <Link ref={ref} to={to} {...props} />
  ));
}
