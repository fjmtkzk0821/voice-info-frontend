import { Card, Box, Grid, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

type IProps = {
  defaultValue: string,
  onClick: Function
}

function HTMLEditBlock({defaultValue, onClick}: IProps) {
    return (
      <Card variant="outlined">
        <Box sx={{ p: 1, minHeight: 64 }}>
          <Grid container>
            <Grid item xs><div dangerouslySetInnerHTML={{__html: defaultValue}}/></Grid>
            <Grid item>
              <IconButton onClick={() => onClick()} size="small">
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
}

export default HTMLEditBlock