import { useState } from "react";

export default function ContactForm() {
  const [mensaje, setMensaje] = useState("");

  const enviarFormulario = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const respuesta = await fetch("http://localhost:3000/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });


      if (respuesta.ok) {
        setMensaje("✅ Formulario enviado con éxito");
        event.target.reset(); // Limpia el formulario
      } else {
        setMensaje("❌ Hubo un error al enviar el formulario");
      }

    } catch (error) {
      setMensaje("⚠️ No se pudo conectar con el servidor");
    }
  };

  return (
    <div>
    <form onSubmit={enviarFormulario}>
      <div className="alineaInputs">
        <label>Nombre:</label>
        <input type="text" id="Nombre" name="nombre" required />
        <br />

        <label>Apellidos:</label>
        <input type="text" id="Apellidos" name="apellidos" required />
        <br />

        <label>Email:</label>
        <input type="email" id="Email" name="email" required />
        <br />

        <label>Teléfono:</label>
        <input type="tel" id="Telefono" name="telefono" required />
        <br />

        <label>Motivo de contacto:</label>
        <textarea id="motivo" name="motivo" required></textarea>
      </div>

      <div className="alineaBtn">
        <button className="btnEnviar" type="submit">Enviar</button>
      </div>
    </form>
    {mensaje && <p style={{
        marginTop:"30px", 
        color: mensaje.includes("✅") ? "green" : "red", 
        textAlign: "center",
        }}>{mensaje}</p>}
    </div>
  );
}
