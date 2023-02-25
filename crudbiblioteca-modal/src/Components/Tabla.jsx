import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Tabla({filas, campos, controlador, evento}){

    useEffect(() => {

    }, [])

    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>
                            <button className="btn btn-success" onClick={() => evento()} data-bs-toggle="modal" data-bs-target="#autoresModal">Nuevo</button>
                            </td>
                        {campos.map((value, index) => {
                            return <th key={index}>{value}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    
                        {filas.map((value, index) => {
                            return <tr key={index}>
                                <td>
                                    <button className="btn btn-primary" onClick={() => evento(Object.values(value)[0])} data-bs-toggle="modal" data-bs-target="#autoresModal">Editar</button>
                                    <button className="btn btn-danger" onClick={() => evento(Object.values(value)[0], true)} data-bs-toggle="modal" data-bs-target="#autoresModal">Eliminar</button>
                                </td>
                                {Object.values(value).map((value2, index2) => {
                                    return <td key={index2}>{value2}</td>
                                })}
                            </tr>
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default Tabla