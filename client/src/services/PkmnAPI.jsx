const getAllPokemon = async () => {

    try {
        const response = await fetch('/pkmn')
        const data = await response.json()

        return data

    } catch (err) {
        return {error: err.message}
    }
}

const getPokemonById = async (id) => {

    try {
        const response = await fetch(`/pkmn/${id}`)
        const data = await response.json()

        return data

    } catch (err) {
        return {error: err.message}
    }

}
 
const createPokemon = async (pkmnDetails) => {

    try {
        const response = await fetch('/pkmn', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pkmnDetails)
        })
        const data = await response.json();
        console.log(data)
    } catch (err) {
        return {error: err.message}
    }
}

const updatePokemon = async (pkmnDetails, id) => {
    
    try {
        const response = await fetch(`/pkmn/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(pkmnDetails)
        })
        const data = await response.json()
        console.log(data)
    } catch (err) {
        return {error: err.message}
    }

}

const deletePokemon = async (id) => {
    try {
        const response = await fetch(`/pkmn/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
    } catch (err) {
        return {error: err.message}
    }
}

export default {
    getAllPokemon,
    getPokemonById,
    createPokemon,
    updatePokemon,
    deletePokemon
}