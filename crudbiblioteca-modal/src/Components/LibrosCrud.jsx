import React, { useEffect, useState } from "react"
import Menu from "./Menu"
import axios from "axios"
import Tabla from "./Tabla"

function LibroCrud(){

    const[libros, setLibros] = useState()

    useEffect(() => {
        getLibros()
    }, [])


    async function getLibros(){
        try{
            const res = await axios("https://denny2023.azurewebsites.net/api/libros")
            const data = await res.data

            setLibros(data)
            
        }
        catch(error){
            alert(error)
        }
    }

    return(
        <div>
            <Menu />
            <h1>Libro</h1>
            {
                libros == undefined ?
                    <div className="spinner-border text-primary" role="status"><span>Loading...</span></div>
                :
                    <Tabla filas={libros} controlador="libros" campos={["LibroId", "Titulo", "Descripción", "Edición", "ISBN", "AutorId", "Nombre", "Apellido"]} />
            }
        </div>
    )
}

export default LibroCrud