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
      <Typography variant="h6" marginBottom="3%">
        Draft your Pokemon Party in Pokemon Party Picker! Press the + to add a Pokemon. (NOTE: You may only add up to 6 Pokemon at a time.)
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
            <AddCard 
                key={item.id} 
                pkmnData={item} 
                onDelete={(id) => {
                    setPkmnData(prev => prev.filter(p => p.id !== id))
                }}
            />
          ))}
          { pkmnData.length < 6 && <AddCard />}
        </Box>
      )}
    </>
  );
}
