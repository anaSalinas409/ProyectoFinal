const express = require('express');
const fs = require("fs"); 
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi API con Express!');
});

// Ruta POST para recibir datos y guardarlos en un archivo de texto
app.post("/contacto", (req, res) => {
    const { nombre, apellidos, email, telefono, motivo } = req.body;

    if (!nombre || !apellidos || !email || !telefono || !motivo) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Crear una línea de texto con los datos recibidos
    const contacto = `Nombre: ${nombre} ${apellidos}\nEmail: ${email}\nTeléfono: ${telefono}\nMotivo: ${motivo}\n----------------------\n`;

    // Guardar en un archivo (append para agregar sin borrar datos previos)
    fs.appendFile("contactos.txt", contacto, (err) => {
        if (err) {
            console.error("Error al guardar el contacto:", err);
            return res.status(500).json({ error: "Error al guardar el contacto" });
        }
        res.json({ mensaje: "Contacto guardado con éxito" });
    });
});

// Iniciar el servidor
module.exports = app;
