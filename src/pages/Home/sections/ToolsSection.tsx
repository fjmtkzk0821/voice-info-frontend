import { List } from "@mui/material"
import HandymanIcon from '@mui/icons-material/Handyman'

import DefaultSection from "../../../components/DefaultSection";

function ToolsSection() {
  return (
    <DefaultSection label="Tools" icon={<HandymanIcon />}>
      <List dense={true}>
      </List>
    </DefaultSection>
  );
}

export default ToolsSection