import Comentarios from '../../app/comentarios';
const App=(props)=>{
  return  <div className="pt-3">
            <Comentarios date={true} id={"Visitas_"+props.data.usuario_id+"data"}/>
          </div>
}

export default App
