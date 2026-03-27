const getAllPokemon = async () => {

    try {
        const response = await fetch('/pkmn')
        const data = await response.json()

        return data

    } catch (err) {
        return {error: err.message}
    }
}


export default {
    getAllPokemon
}