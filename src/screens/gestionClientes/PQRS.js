import Comentarios from '../../app/comentarios';
const tipos_comentarios     =   [
  {
    value:"Petición",
    label:"Petición",
  },
  {
    value:"Queja",
    label:"Queja",
  },
  {
    value:"Reclamo",
    label:"Reclamo",
  },
  {
    value:"Solicitud",
    label:"Solicitud",
  },
]
const App=(props)=>{
  return  <div className="pt-3">
            <Comentarios tipos_comentarios={tipos_comentarios} id={"PQRS_"+props.data.usuario_id+"data"}/>
          </div>
}

export default App
