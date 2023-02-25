import React, {useState, useEffect} from "react";
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import Menu from "./Menu"


function LibrosForm({del}){

    const[titulo, setTitulo] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[edicion, setEdicion] = useState("")
    const[isbn, setIsbn] = useState("")
    const[autorId, setAutorId] = useState(0)
    const[autores, setAutores] = useState()

    const{id} = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
        getAutores()
        if(id!=undefined)
            getLibro()
    }, [])

    async function getLibro(){
        try{
            const res = await axios("https://denny2023.azurewebsites.net/api/libros/"+id)
            const data = res.data

            setTitulo(data.titulo)
            setDescripcion(data.descripcion)
            setEdicion(data.edicion)
            setIsbn(data.isbn)
            setAutorId(data.autorId)
        }
        catch(error){
            alert(error)
        }
    }

    async function getAutores(){
        try{
            const res = await axios("https://denny2023.azurewebsites.net/api/autores")
            const data = await res.data

            setAutores(data)
        }
        catch(error){
            alert(error)
        }
    }

    async function guardar(){
        try{
            const libro = {
                "titulo": titulo,
                "descripcion": descripcion,
                "edicion": edicion,
                "isbn": isbn,
                "autorId": autorId
              }
            
            const res = await axios({
                method: "POST",
                url: "https://denny2023.azurewebsites.net/api/libros",
                data: libro
            })

            const data = await res.data

            alert(data.message)
            if(data.status==1)
                navigate("/libros")
        }
        catch(error){
            alert(error)
        }
    }

    async function editar(){
        try{
            const libro = {
                "libroId": id,
                "titulo": titulo,
                "descripcion": descripcion,
                "edicion": edicion,
                "isbn": isbn,
                "autorId": autorId
              }

            const res = await axios({
                method: "PUT",
                url: "https://denny2023.azurewebsites.net/api/libros",
                data: libro
            })

            const data = await res.data

            alert(data.message)
            if(data.status == 1)
                navigate("/libros")
        }
        catch(error){
            alert(error)
        }
    }

    async function eliminar(){
        try{
            const res = await axios({
                method: "DELETE",
                url: "https://denny2023.azurewebsites.net/api/libros?id="+id
            })

            const data = await res.data

            alert(data.message)
            if(data.status == 1)
                navigate("/libros")
        }
        catch(error){
            if(error.response.status == 404){
                alert("Libro no existe!")
                navigate("/libros")
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
    
    return(
        <div>
            <Menu />
            <div className="form-group mt-2">
                    <label className="form-label">Libro ID</label>
                    <input className="form-control" type="text" value={id} readOnly disabled />
            </div>
            <form id="formulario" className="needsValidation" noValidate>
                <div className="form-group mt-2">
                    <label className="form-label">Titulo</label>
                    <input className="form-control" type="text" value={titulo} required disabled={del==true ? true : false} onChange={(e) => setTitulo(e.target.value)} />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Descripción</label>
                    <input className="form-control" type="text" value={descripcion} required disabled={del==true ? true : false} onChange={(e) => setDescripcion(e.target.value)}/>
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Edición</label>
                    <input className="form-control" type="number" value={edicion} required disabled={del==true ? true : false} onChange={(e) => setEdicion(e.target.value)} />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">ISBN</label>
                    <input className="form-control" type="text" value={isbn} required disabled={del==true ? true : false} onChange={(e) => setIsbn(e.target.value)} />
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mt-2">
                    <label className="form-label">Autor</label>
                    <select className="form-select" value={autorId} required disabled={del==true ? true : false} onChange={(e) => setAutorId(e.target.value)}>
                        <option value="">No seleccionado</option>
                        {
                            autores!=undefined ?
                                autores.map((value, index) =>{
                                    return <option key={index} value={value.autorId}>{value.nombre+" "+value.apellido}</option>
                                })
                            :
                                ""
                        }
                        
                    </select>
                    <div className="valid-feedback">Correcto</div>
                    <div className="invalid-feedback">Complete el campo</div>
                </div>
                <div className="form-group mt-2">
                    <button onClick={(e) => enviar(e)} className={`btn btn-${id == undefined ? "success" : del!=true ? "primary" : "danger"}`}>{id == undefined ? "Guardar" : del!=true ? "Editar" : "Eliminar"}</button>
                    <button className="btn btn-secondary" onClick={() => navigate("/libros")}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default LibrosForm