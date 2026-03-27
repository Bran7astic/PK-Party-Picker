import { AddCircle } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddCard({pkmnData}) {

    const navigate = useNavigate()

    return(
        <Box 
            maxWidth="30%"
        >
            <Card sx={{height: "20em", cursor: "pointer"}}>
                <CardContent sx={{height: "100%"}}>
                    {
                        pkmnData ? (
                            "Pkmn data here"
                        ) : (
                            <Stack 
                                width="100%"
                                height="100%"
                                justifyContent="center" 
                                alignItems="center"
                                onClick={() => {navigate('/add')}}
                            >

                                <AddCircle fontSize="large"/>

                            </Stack>
                        )
                    }
                </CardContent>
            </Card>
        </Box>
    )
}