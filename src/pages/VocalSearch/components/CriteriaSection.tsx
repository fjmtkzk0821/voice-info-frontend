import { Box, Card, Typography } from "@mui/material";
import { ReactNode } from "react";

type IProps = {
    label: string,
    children?: ReactNode
}

function CriteriaSection({label, children}:IProps) {
    return (<Card variant="outlined" sx={{
        borderColor: "primary.main"
    }}>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            paddingX: 2,
            paddingY: 0.5,
            backgroundColor: "primary.main",
        }}>
            <Typography component="span" variant="subtitle2" sx={{
                color: "white.main",
                fontWeight: "bold"
            }}>{label}</Typography>
        </Box>
        {children}
    </Card>);
}

export default CriteriaSection