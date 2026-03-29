import { useParams } from "react-router-dom";
import PkmnForm from "../../components/PkmnForm";
import { useEffect, useState } from "react";
import APIController from '../../services/PkmnAPI'

export default function EditPkmn() {

    const {id} = useParams()

    const [pkmnData, setPkmnData] = useState(null)

    useEffect(() => {
        
        const fetchPokemonById = async (id) => {
            const data = await APIController.getPokemonById(id)
            setPkmnData(data)
        }
        
        if (id) {
            fetchPokemonById(id)
        }

    }, [id]) 

    return(
        <>
            <PkmnForm edit pokemon={pkmnData}/>
        </>
    )
}