import Comentarios from '../../app/comentarios';
const tipos_comentarios     =   [
  {
    value:"Conversación",
    label:"Conversación",
  },
  {
    value:"Ejecución obra",
    label:"Ejecución obra",
  },
  {
    value:"Envío cotización",
    label:"Envío cotización",
  },
  {
    value:"Envío portafolio",
    label:"Envío portafolio",
  },
  {
    value:"Llamada",
    label:"Llamada",
  },
  {
    value:"Programación cita",
    label:"Programación cita",
  },
  {
    value:"Programación visita comercial",
    label:"Programación visita comercial",
  },
  {
    value:"Programación visita técnica",
    label:"Programación visita técnica",
  },
  {
    value:"Seguimiento negocio",
    label:"Seguimiento negocio",
  },
  {
    value:"Whatsapp",
    label:"Whatsapp",
  },
  {
    value:"Otros",
    label:"Otros",
  },
]
const App=(props)=>{
  return  <div className="pt-3">
            <Comentarios tipos_comentarios={tipos_comentarios} id={"Comment_"+props.data.usuario_id+"data"}/>
          </div>
}

export default App
