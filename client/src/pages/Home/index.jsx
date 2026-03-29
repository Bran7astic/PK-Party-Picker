import { Box, CircularProgress, Typography } from "@mui/material";
import AddCard from "../../components/AddCard";
import { useEffect, useState } from "react";
import APIController from "../../services/PkmnAPI";

export default function Home() {
  const [pkmnData, setPkmnData] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      setFetching(true);
      const data = await APIController.getAllPokemon();
      setFetching(false);

      setPkmnData(data);
    };

    fetchPokemon();
  }, []);

  return (
    <>
      <Typography variant="h3" marginBottom="3%">
        Pokemon Party Picker
      </Typography>
      {fetching ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "3%",
          }}
        >
          {pkmnData.map((item) => (
            <AddCard pkmnData={item} />
          ))}
          { pkmnData.length < 6 && <AddCard />}
        </Box>
      )}
    </>
  );
}
