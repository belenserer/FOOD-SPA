import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../Redux/actions";

export default function NavBar(){
    const distpach = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        if (name) {
            distpach(getNameRecipes(name));
          } else alert("El campo de busqueda está vacío!")
        setName("")
    }

    return (
        <div>
            <input 
            type= 'text' 
            placeholder="Buscar comidas"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            onChange = {(e) => handleInputChange(e)}
            value={name}
            />
            <button type='submit' onClick= {(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )
}