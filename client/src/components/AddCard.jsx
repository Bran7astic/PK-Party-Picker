import { AddCircle } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCard({pkmnData}) {

    const navigate = useNavigate()

    useEffect(() => {
        console.log(pkmnData)
    }, [])

    return(
        <Box 
            width="31%"
        >
            <Card sx={{height: "20em", cursor: "pointer", marginBlock: "2%"}}>
                <CardContent sx={{height: "100%"}}>
                    {
                        <Stack 
                            width="100%"
                            height="100%"
                            justifyContent="center" 
                            alignItems="center"
                            onClick={() => {pkmnData ? navigate(`/edit/${pkmnData.id}`) : navigate('/add')}}
                        >
                            {pkmnData ? (
                                <Stack gap={2} sx={{width: "90%"}}>
                                    <Typography variant="h5" align="left" sx={{position: "fixed"}}>{pkmnData.nickname}</Typography>
                                    <Box 
                                        component="img" 
                                        src={pkmnData.image}
                                        width={300}
                                        alignSelf="center"
                                    />
                                </Stack>
                            ) : (
                                <AddCircle fontSize="large"/>
                            )}

                        </Stack>
                    }
                </CardContent>
            </Card>
        </Box>
    )
}