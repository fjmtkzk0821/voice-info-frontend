import { Card, CardHeader, Icon } from "@mui/material";

type IProps = {
    label: string,
    icon: React.ReactNode,
    children?: React.ReactNode
}

const DefaultSection = ({ label, icon, children }: IProps) => {
  return (
    <Card>
      <CardHeader avatar={icon} title={label} />
      {children}
    </Card>
  );
};

export default DefaultSection