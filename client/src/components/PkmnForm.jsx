import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { natures, natureIndexMap } from "./natures.js";
import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart'
import { AutoAwesome, AutoAwesomeOutlined, Search } from "@mui/icons-material";
import APIController from '../services/PkmnAPI.jsx'
import { useNavigate } from "react-router-dom";

export default function PkmnForm({edit=false, pokemon=null}) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [pkmnFromDb, setPkmnFromDb] = useState(null) // Pokemon passed in as prop from database
  const [currPokemon, setCurrPokemon] = useState(null); // PokeAPI object with pokemon name and url to get more details
  const [pkmnJson, setPkmnJson] = useState(null); // Detailed json about pokemon from PokeAPI
  const [pkmnDetails, setPkmnDetails] = useState( pokemon || { // Specific pokemon that is to be uploaded to the database
    dexNo: null,
    nickname: "",
    image: "",
    nature: "",
    ability: "",
    stats: [],
    shiny: false,
  });
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  // Fetch list of all pokemon
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
    setPkmnFromDb(pokemon)
  }, [pokemon])

  useEffect(() => {

    const fetchPkmnJson = async() => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnFromDb.dexno}`)
        const data = await response.json()
        setPkmnJson(data)
    }

    if (pkmnFromDb) {
        setPkmnDetails(pkmnFromDb) 
        fetchPkmnJson()
    }
  }, [pkmnFromDb])

  // Fetch additional info about current pokemon
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

    setPkmnFromDb(null)
    getPkmnInfo();
  }, [currPokemon]);

  // Set pkmnDetails
  useEffect(() => {
    if (pkmnJson) {
      setPkmnDetails((prev) => ({
        dexNo: pkmnJson.id,
        nickname: pkmnFromDb ? pkmnFromDb.nickname : capitalize(pkmnJson.name),
        image: pkmnFromDb ? pkmnFromDb.image : pkmnJson.sprites.other["official-artwork"].front_default,     
        shiny: pkmnFromDb ? pkmnFromDb.shiny : false,     
        nature: pkmnFromDb ? pkmnFromDb.nature : "",
        ability: pkmnFromDb ? pkmnFromDb.ability : "",
        stats: pkmnJson.stats.reduce(
          (statsArr, currStat) => [...statsArr, currStat.base_stat],
          [],
        ),
      }));
    }
  }, [pkmnJson]);

  useEffect(() => {
    setPkmnDetails(prev => ({
        ...prev,
        image: prev.shiny ? 
                pkmnJson?.sprites.other["official-artwork"].front_shiny : 
                pkmnJson?.sprites.other["official-artwork"].front_default,     
    }))
  }, [pkmnDetails.shiny])
    
  const capitalize = (string) => {
    if (!string || string.length === 0) {
      return string;
    }

    const pokemonNameExceptions = {
      "nidoran-f": "Nidoran-F",
      "nidoran-m": "Nidoran-M",
      "porygon-2": "Porygon-2",
      "farfetchd": "Farfetch'd",
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
    }));
  }

  // Reset blank nickname to default


  const handleSubmit = (type) => {
    const finalDetails = {
        ...pkmnDetails,
        nickname: pkmnDetails.nickname || capitalize(pkmnJson?.name)
    }

    setPkmnDetails(finalDetails)

    const sendToDb = async () => {

        switch (type) {
            case "create":
                await APIController.createPokemon(finalDetails)
                break
            case "update":
                await APIController.updatePokemon(finalDetails, pokemon?.id)
                break
            case "delete":
                await APIController.deletePokemon(pokemon?.id)
                break
            default:
                console.error("Not valid submission type")
        }
    }

    let newErrors= {}

    if (!pkmnDetails.nature) {
        newErrors.nature = "A Nature must be selected!"
    }

    if (!pkmnDetails.ability) {
        newErrors.abilities = "An ability must be selected!"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length == 0) {        
        sendToDb()
        navigate('/')
    }

  }


  useEffect(() => {
    console.log("===============")
    console.log(currPokemon);
    console.log(pkmnJson);
    console.log(pkmnDetails);
    console.log("===============")
}, [currPokemon, pkmnJson, pkmnDetails]);

  return (
    <Box>
      <Stack gap={5}>
        
        {/* Search Bar */}
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
                sx={{ width: "50%"}}
                variant="outlined"
              />
            )}
          />
        ) : (
          <CircularProgress />
        )}

        {pkmnJson && (
          <Stack direction="column" alignItems="center" justifyContent="center" gap={5}>
            
            <Stack direction="row" gap={5}>

                {/* Nickname */}
                <TextField 
                    label="Nickname" 
                    variant="standard"
                    value={pkmnDetails.nickname}
                    onChange={event => {
                        setPkmnDetails(prev => ({
                            ...prev,
                            nickname: event.target.value,
                        }))
                    }}
                    />

                {/* Shiny Checkbox */}
                <Checkbox
                    checked={pkmnDetails.shiny}
                    onChange={() => {setPkmnDetails(prev => ({
                        ...prev,
                        shiny: !prev.shiny
                    }))}}
                    icon={<AutoAwesomeOutlined/>}
                    checkedIcon={<AutoAwesome/>}  
                />
            </Stack>


            {/* Image */}
            <Box 
                component="img" 
                src={pkmnDetails.image} 
                width={400}
            />
            
            {/* Stats */}
            <Stack>
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
                        data: pkmnDetails?.stats.map((val, index) => {
                            if (pkmnDetails.nature) {
                                if (index === natureIndexMap[pkmnDetails.nature][0]) return Math.floor(val * (1 + 0.1))
                                    if (index === natureIndexMap[pkmnDetails.nature][1]) return Math.floor(val * (1 - 0.1))
                                    }
                                return val
                            }), 
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
                <Typography variant="subtitle2">BST: {pkmnDetails.stats.reduce((a, b) => a + b, 0)}</Typography>
            </Stack>

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
                error={!!errors.nature}
                helperText={!!errors.nature? errors.nature : "Natures will impact your Pokemon's stats!"}
                value={pkmnDetails.nature}
                onChange={handleNature}
                sx={{width: "45%"}}
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
                error={!!errors.abilities}
                helperText={!!errors.abilities ? errors.abilities : "Abilities provide extra functionality in battle!"}
                value={pkmnDetails.ability}
                sx={{width: "45%"}}
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

            {edit ? (
                <Stack gap={2} direction="row">
                    <Button variant="contained" onClick={() => handleSubmit("delete")}><Typography color="white">DELETE</Typography></Button>
                    <Button variant="outlined" onClick={() => handleSubmit("update")}>UPDATE</Button>
                </Stack>
            ) : (
                <Button variant="outlined" onClick={() => handleSubmit("create")}>+ ADD</Button>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
