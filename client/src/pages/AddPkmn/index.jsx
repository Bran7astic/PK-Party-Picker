import { Autocomplete, Box, CircularProgress, MenuItem, Stack, TextField } from "@mui/material";
import { natures } from "./natures.js";
import { useEffect, useState } from "react";

export default function AddPkmn() {
  
    const [allPokemon, setAllPokemon] = useState([])
    const [currPokemon, setCurrPokemon] = useState(null)

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const results = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
                const data = await results.json()

                setAllPokemon(data.results)
            } catch (err) {
                console.error(err)
            }
        }

        fetchAllPokemon()

    }, [])

    
    function capitalize(string) {
        if (string.length === 0) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    useEffect(() => {console.log(currPokemon)}, [currPokemon])

    return (
    <Box>
      <Stack>

        {allPokemon ? (
            <Autocomplete
                options={allPokemon}
                value={currPokemon}
                onChange={(event, newValue) => {
                    setCurrPokemon(newValue)
                    // fetch pokemon info from URL here
                }}
                getOptionLabel={(option) => capitalize(option.name)}
                isOptionEqualToValue={(option, value) => 
                    option.url === value.url
                }
                renderInput={(params) => (
                    <TextField {...params} label="Search Pokemon"/>
                )}
            />
        ) : (
            <CircularProgress/>
        )}

        <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="center"
            gap={5}
        >
          <TextField
            label="Nature"
            select
            helperText="Natures will impact your Pokemon's stats!"
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

          <TextField
            label="Ability"
            select
            helperText="Abilities provide extra functionality in battle!"
          >

          </TextField>
        </Stack>


      </Stack>
    </Box>
  );
}
