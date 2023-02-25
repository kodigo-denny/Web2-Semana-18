import axios from "axios";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import Tabla from "./Tabla";
import AutoresForm from "./AutoresForm"

function AutoresCrud(){

    const[autores, setAutores] = useState()
    const[id, setId] = useState()
    const[del, setDel] = useState()

    function configuar(id, del){
        setId(id)
        setDel(del)
    }

    useEffect(() =>{
        obtenerAutores()
    },[autores])

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
                    <Tabla filas={autores} evento={configuar} controlador="autores" campos={["ID", "Nombre", "Apellidos", "Pais de origen"]} />
            }
            

            
            <div className="modal fade" id="autoresModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Autores</h1>
                        <button type="button" id="btnClose" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <AutoresForm id={id} del={del} />
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default AutoresCrud