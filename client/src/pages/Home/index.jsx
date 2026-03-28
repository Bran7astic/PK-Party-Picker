import { Box, Typography } from "@mui/material";
import AddCard from "../../components/AddCard";
import { useEffect, useState } from "react";
import PkmnAPI from "../../services/PkmnAPI";

export default function Home() {

    const [pkmnData, setPkmnData] = useState({})

    useEffect(() => {
        const fetchPokemon = async () => {
            const data = await PkmnAPI.getAllPokemon()
            console.log(data)
        }

        fetchPokemon()

    }, [])

    return(
        <>
            <Typography variant="h3" marginBottom="3%">
                Pokemon Party Picker
            </Typography>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "3%"
            }}>
                <AddCard/>
            </Box>
        </>
    )
}