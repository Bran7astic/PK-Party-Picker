import { AddCircle, Delete } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIController from "../services/PkmnAPI"

export default function AddCard({pkmnData, onDelete}) {

    const navigate = useNavigate()

    useEffect(() => {
        console.log(pkmnData)
    }, [])

    const handleDelete = (event) => {
        event.stopPropagation()
        const deletePkmn = async () => {
            await APIController.deletePokemon(pkmnData.id)
            onDelete(pkmnData.id)
        }
        deletePkmn()
    }

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
                                <Box sx={{width: "90%", height: "100%", position: "relative"}}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1}}
                                    >
                                        <Typography variant="h5" align="left">{pkmnData.nickname}</Typography>
                                        <IconButton    
                                            aria-label="delete" 
                                            color="primary"
                                            onClick={handleDelete} 
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </Stack>

                                    <Box sx={{position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <Box 
                                            component="img" 
                                            src={pkmnData.image}
                                            width={300}
                                        />
                                    </Box>
                                </Box>
                            ) : (
                                <AddCircle fontSize="large" color="primary"/>
                            )}

                        </Stack>
                    }
                </CardContent>
            </Card>
        </Box>
    )
}