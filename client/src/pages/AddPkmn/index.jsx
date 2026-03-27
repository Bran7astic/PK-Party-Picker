import { Box, MenuItem, TextField } from "@mui/material";
import { natures } from "./natures.js";

export default function AddPkmn() {
    return(
        <Box>
            <TextField
                label = "Nature"
                select
                helperText="Natures will impact your Pokemon's stats!"
            >
                {natures.map((nature) => (
                    <MenuItem key={nature.name} value={nature.name}>
                        {nature.name} 
                            {`${
                                nature.increase !== "None" ? 
                                ` (+${nature.increase}`: ""
                            } ${
                                nature.decrease !== "None" ? 
                                ` -${nature.decrease})` : ""
                            }`}
                        
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
}