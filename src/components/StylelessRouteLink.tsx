import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

type IProps = {
    children: ReactNode
    linkProps: LinkProps
}

function StylelessRouteLink({children, linkProps}: IProps) {
    return (
      <Link {...linkProps} style={{ textDecoration: "none", color: "inherit" }}>
        {children}
      </Link>
    );
}

export default StylelessRouteLink;