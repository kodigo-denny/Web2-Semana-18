import React, {useEffect, useState} from "react";
import Menu from "./Menu"
import axios from "axios";

function AutoresForm({del, id}){

    const[nombre, setNombre] = useState("")
    const[apellido, setApellido] = useState("")
    const[pais, setPais] = useState("")

    useEffect(() =>{
        //console.log(id)
        if(id!=undefined)
            cargarAutor()
        else{
            setNombre("")
            setApellido("")
            setPais("")
        }
    },[id])

    async function cargarAutor(){
        try{
            const res = await axios("https://denny2023.azurewebsites.net/api/autores/"+id)
            const data = await res.data

            console.log(data)
            setNombre(data.nombre)
            setApellido(data.apellido)
            setPais(data.paisOrigen)
        }
        catch(error){
            if(error.response.status == 404){
                alert("Autor no existe!")
                document.querySelector("#btnClose").click()
            }
            else
                alert(error)
            
        }
    }

    function enviar(e){
        e.preventDefault()
        e.stopPropagation()
        const form = document.querySelector("#formulario")
        
        if(form.checkValidity() == false)
            form.classList.add('was-validated')
        else{
            if(id == undefined)
                guardar()
            else if(del != true)
                editar()
            else
                eliminar()
        }
    }

    async function eliminar(){
        try{
            const res = await axios({
                method: "DELETE",
                url: "https://denny2023.azurewebsites.net/api/autores?id="+id
            })

            const data = await res.data

            alert(data.message)
            if(data.status == 1)
                document.querySelector("#btnClose").click()
        }
        catch(error){
            if(error.response.status == 404){
                alert("Autor no existe!")
                document.querySelector("#btnClose").click()
            }
            else
                alert(error)
        }
    }

    async function editar(){
        try{
            const autor = {
                autorId: id,
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }

            const res = await axios({
                method: "PUT",
                url: "https://denny2023.azurewebsites.net/api/autores",
                data: autor
            })

            const data = await res.data

            alert(data.message)
            if(data.status == 1)
                document.querySelector("#btnClose").click()
        }
        catch(error){
            alert(error)
        }
    }

    async function guardar(){
        try{
            const autor = {
                nombre: nombre,
                apellido: apellido,
                paisOrigen: pais
            }
            
            const res = await axios({
                method: "POST",
                url: "https://denny2023.azurewebsites.net/api/autores",
                data: autor
            })

            const data = await res.data

            alert(data.message)
            if(data.status==1)
                document.querySelector("#btnClose").click()
        }
        catch(error){
            alert(error)
        }
    }

    function cancelar(e){
        e.preventDefault()
        e.stopPropagation()
    }

    return(
        <div>
            <h1>{id==undefined ? "Add" : del!=true ? "Edit" : "Delete"}</h1>
            

            {id!=undefined ?
                <div className="form-group">
                    <label className="form-label">Autor ID</label>
                    <input className="form-control" type="text" value={id} readOnly disabled></input>
                </div>
                :
                ""
            }
            
            
            <form id="formulario" className="needs-validation" noValidate>
                <div className="form-group mt-2">
                    <label className="form-label">Nombre:</label>
                    <input className="form-control" required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={del==true ? true : false} />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Apellido:</label>
                    <input className="form-control" required type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} disabled={del==true ? true : false} />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Pais de origen</label>
                    <input className="form-control" required type="text" value={pais} onChange={(e) => setPais(e.target.value)} disabled={del==true ? true : false} />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mt-2">
                    <button className={`btn btn-${id == undefined ? "success" : del!=true ? "primary" : "danger"}`} onClick={(e) => enviar(e)}>{id == undefined ? "Guardar" : del!=true ? "Editar" : "Eliminar"}</button>
                    <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => cancelar(e)}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default AutoresForm