import { Paper, Breadcrumbs, Typography, Link, Chip } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isStringEmpty } from "../../utils/common";
import { getString } from "../../utils/localization";

function DefaultBreadcrumbs() {
  const navigate = useNavigate();
    const location = useLocation();
    const paths = location.pathname
      .slice(1)
      .split("/")
      .filter((val) => !isStringEmpty(val));
    // console.log(paths);
    return (
      <Paper square>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{
            paddingY: 1,
            paddingX: 2,
          }}
        >
          <Chip
            label={getString("link", "home")}
            icon={<HomeIcon fontSize="small" />}
            size="small"
            onClick={() => {
              navigate("/");
            }}
          />
          {paths.map((path, index) => (
            <Chip
              key={`bc-${path}-${index}`}
              label={getString("link", path)}
              size="small"
              color={index === paths.length - 1 ? "primary" : "default"}
            />
          ))}
          {/* <Chip label="home" size="small" />
          <Chip label="home" size="small" />
          <Chip color="primary" label="home" size="small" /> */}
        </Breadcrumbs>
      </Paper>
    );
}

export default DefaultBreadcrumbs