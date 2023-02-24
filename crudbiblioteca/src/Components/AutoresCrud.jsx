import axios from "axios";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Tabla from "./Tabla";

function AutoresCrud(){

    const[autores, setAutores] = useState()

    useEffect(() =>{
        obtenerAutores()
    },[])

    async function obtenerAutores(){
        try{
            const res = await axios("https://denny2023.azurewebsites.net/api/autores")
            const data = await res.data

            setAutores(data)
        }
        catch(error){
            alert(error)
        }
    }

    return(
        <div>
            <Menu />
            <h1>Autores</h1>
            {
                autores==undefined ?
                    <div className="spinner-border text-primary" role="status"><span>Loading...</span></div>
                :
                    <Tabla filas={autores} controlador="autores" campos={["ID", "Nombre", "Apellidos", "Pais de origen"]} />
            }
            
        </div>
    )
}

export default AutoresCrud