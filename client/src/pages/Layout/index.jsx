import { AppBar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {

    const navigate = useNavigate()

    return(
        <Box>
            <AppBar position="static" sx={{backgroundColor: "#ff7878"}}>
                <Toolbar>
                    <Stack direction="row" justifyContent="center" width="100%">
                        <IconButton aria-label="add">
                        </IconButton>
                        <Typography 
                            fontWeight="bold"
                            variant="h5"
                            color="white"
                            onClick={() => navigate('/')}
                            sx={{cursor: "pointer"}}
                        >
                            Pokemon Party Picker
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>
            
            <Box padding="3%">
               <Outlet/>
            </Box>
            
        </Box>
    )
}