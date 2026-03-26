import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return(
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Stack direction="row" justifyContent="center" width="100%">
                        <IconButton aria-label="add">
                        </IconButton>
                        <Typography fontWeight="bold" variant="h5">Pokemon Party Picker</Typography>
                    </Stack>
                </Toolbar>
            </AppBar>
            
            <Box padding="3%">
               <Outlet/>
            </Box>
            
        </Box>
    )
}