import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AutoresCrud from "./AutoresCrud";
import AutoresForm from "./AutoresForm";
import HomePage from "./HomePage"
import LibroCrud from "./LibrosCrud";
import LibrosForm from "./LibrosForm";

function App(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/autores" element={<AutoresCrud />} />
                <Route path="/libros" element={<LibroCrud />} />
                <Route path="/libros/Add" element={<LibrosForm />} />
                <Route path="/libros/Edit/:id" element={<LibrosForm />} />
                <Route path="/libros/Delete/:id" element={<LibrosForm del={true} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App