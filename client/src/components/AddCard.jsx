import { AddCircle } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddCard({pkmnData}) {

    const navigate = useNavigate()

    return(
        <Box 
            width="31%"
        >
            <Card sx={{height: "20em", cursor: "pointer", marginBlock: "2%"}}>
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