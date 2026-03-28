import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { natures, natureIndexMap } from "./natures.js";
import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart'

export default function AddPkmn() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [currPokemon, setCurrPokemon] = useState(null);
  const [pkmnJson, setPkmnJson] = useState(null);
  const [pkmnDetails, setPkmnDetails] = useState({
    nickname: "",
    image: "",
    nature: "",
    ability: "",
    stats: [],
  });

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const results = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
        );
        const data = await results.json();

        setAllPokemon(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    const getPkmnInfo = async () => {
      if (currPokemon) {
        try {
          const results = await fetch(currPokemon.url);
          const data = await results.json();

          setPkmnJson(data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    getPkmnInfo();
  }, [currPokemon]);

  useEffect(() => {
    if (pkmnJson) {
      setPkmnDetails((prev) => ({
        ...prev,
        nickname: capitalize(pkmnJson.name),
        image: pkmnJson.sprites.other["official-artwork"].front_default,
        stats: pkmnJson.stats.reduce(
          (statsArr, currStat) => [...statsArr, currStat.base_stat],
          [],
        ),
        ability: "",
        nature: "",
      }));
    }
  }, [pkmnJson]);

  const capitalize = (string) => {
    if (!string || string.length === 0) {
      return string;
    }

    const pokemonNameExceptions = {
      "nidoran-f": "Nidoran-F",
      "nidoran-m": "Nidoran-M",
      "porygon-2": "Porygon-2",
      farfetchd: "Farfetch'd",
      "ho-oh": "Ho-oh",
      "mime-jr": "Mime Jr.",
      "mr-mime": "Mr. Mime",
      "porygon-z": "Porygon-Z",
      "jangmo-o": "Jangmo-O",
      "hakamo-o": "Hakamo-O",
      "kommo-o": "Kommo-O",
      "type-null": "Type: Null",
      "wo-chien": "Wo-Chien",
      "chi-yu": "Chi-Yu",
      "chien-pao": "Chien-Pao",
      "ting-lu": "Ting-Lu",
    };

    if (pokemonNameExceptions[string]) {
      return pokemonNameExceptions[string];
    }

    return string
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleNature = (event) => {

    setPkmnDetails((prev) => ({
        ...prev,
        nature: event.target.value,
        stats: pkmnJson.stats.map((item, index) => {
            if (index === natureIndexMap[event.target.value][0]) return Math.floor(item.base_stat * (1 + 0.1))
            if (index === natureIndexMap[event.target.value][1]) return Math.floor(item.base_stat * (1 - 0.1))
            return item.base_stat
        })
    }));
  }

  const handleSubmit = () => {
    console.log(pkmnDetails)
  }

//   useEffect(() => {
//     console.log(pkmnDetails);
//   }, [pkmnDetails]);

  return (
    <Box>
      <Stack gap={5}>
        {allPokemon ? (
          <Autocomplete
            options={allPokemon}
            value={currPokemon}
            onChange={(event, newValue) => {
              setCurrPokemon(newValue);
            }}
            getOptionLabel={(option) => capitalize(option.name)}
            isOptionEqualToValue={(option, value) => option.url === value.url}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Pokemon"
                sx={{ width: "50%" }}
              />
            )}
          />
        ) : (
          <CircularProgress />
        )}

        {pkmnJson && (
          <Stack direction="column" alignItems="center" justifyContent="center" gap={5}>
            
            {/* Image */}
            <Box component="img" src={pkmnDetails.image} width={400}/>
            
            {/* Stats */}
            <BarChart
                yAxis={[{
                    data: ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"],
                    disableTicks: true,
                    disableLine: true,
                    width: 100,
                }]}
                xAxis={[{
                    disableLine: true,
                    disableTicks: true,
                    tickLabelStyle: {display: "none"},
                    colorMap: {
                        type: "piecewise",
                        thresholds: [50, 80, 150],
                        colors: ["#FF5964", "#FFE74C", "#71B48D", "#53D8FB"]
                    }
                }]}
                series={[{
                    data: pkmnDetails.stats, 
                    barLabel: "value",
                }]}
                layout="horizontal"
                height={200}
                width={600}
                borderRadius={10}
                sx={{
                    '& .MuiBarLabel-root': {
                    fill: 'white' // 👈 this controls label color
                    }
                }}
            />

            {/* Nature & Ability Row */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap={5}
            >

              {/* Nature Select  */}
              <TextField
                label="Nature"
                select
                helperText="Natures will impact your Pokemon's stats!"
                value={pkmnDetails.nature}
                onChange={handleNature}
              >
                {natures.map((nature) => (
                  <MenuItem key={nature.name} value={nature.name}>
                    {nature.name}
                    {`${
                      nature.increase !== "None" ? ` (+${nature.increase}` : ""
                    } ${nature.decrease !== "None" ? ` -${nature.decrease})` : ""}`}
                  </MenuItem>
                ))}
              </TextField>

              {/* Ability Select */}
              <TextField
                label="Ability"
                select
                helperText="Abilities provide extra functionality in battle!"
                value={pkmnDetails.ability}
                onChange={(event) => {
                  setPkmnDetails((prev) => ({
                    ...prev,
                    ability: event.target.value,
                  }));
                }}
              >
                {pkmnJson.abilities.map((item) => (
                  <MenuItem key={item.ability.name} value={item.ability.name}>
                    {capitalize(item?.ability.name)}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Button variant="outlined" onClick={handleSubmit}>+ ADD</Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
