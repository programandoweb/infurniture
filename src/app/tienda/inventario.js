import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';

let id  = 0
const operacion = {
                    sumar:"+",
                    restar:"-",
                  }
  const motivos   = [
                      "Arribo de productos",
                      "Venta por otros medios",
                      "Producto defectuoso",
                      "Corregir",
                    ]

const App=(props)=>{
  const context             =   React.useContext(StateContext);
  const dependencias        =   props.caracteristicas[props.typeElement].dependencias
  const [data, setData]     =   useState({productos:[],estilos:[],colores:[]});
  const [inputs, setInputs] = useState({});
  const [colores, setColores] = useState([]);
  const [estilos, setEstilos] = useState([]);
  const [productos_token, setProductos_token] = useState([]);
  const modulo              =   props.modulo;

  useEffect(() => {
    if (props.open.op_tienda_inventario_id!==undefined) {
      id=props.open.op_tienda_inventario_id
    }
    getInit()
  },[props.caracteristicas[props.typeElement]])

  const getInit=()=>{
    let data        =   {}
        data.dependencias             =   JSON.stringify(dependencias)
        data.op_tienda_inventario_id  =   (props.open.op_tienda_inventario_id!==undefined)?props.open.op_tienda_inventario_id:0
        data.user                     =   context.Store.get("user").token
        data.app                      =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","getCaracteristicas",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setData(data.response.data);
    setProductos_token(data.response.productos_token);
  }

  const onChange=(e)=>{

    if (e.target.name==="producto_token") {
      setColores([])
      if (productos_token[e.target.value].colores!==undefined) {
        let colores_ = []
        Object.entries(productos_token[e.target.value].colores).map((row,key)=>{
          return colores_.push({token:row[0],label:row[1].label})
        })
        setColores(colores_);
      }
      setEstilos([])
      if (productos_token[e.target.value].estilos!==undefined) {
        let estilos_ = []
        Object.entries(productos_token[e.target.value].estilos).map((row,key)=>{
          return estilos_.push({token:row[0],label:row[1].label})
        })
        setEstilos(estilos_);
      }
    }

    let inputs_ =   {...inputs};
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data                          =   {...inputs}
        data.op_tienda_inventario_id  =   (props.open.op_tienda_inventario_id!==undefined)?props.open.op_tienda_inventario_id:0
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Websites","setInventario",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    //console.log(data);
    id=0
    setInputs({})
    props.setOpen(false)
    props.getInit()
  }

  return  <form  onSubmit={onSubmit}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 mb-2">
                  <h3>Producto</h3>
                  <select className="form-control" onChange={onChange} name="producto_token">
                    <option value="">Seleccione el producto</option>
                    {
                      data.productos!==undefined?  data.productos.map((row2,key2)=>{
                                                return <option key={key2} value={row2.token}  className="col">{row2.label}</option>
                                              }):<></>
                    }
                  </select>
                </div>
                <div className="col-6 mb-2">
                  <h5>Operación</h5>
                  <select className="form-control" onChange={onChange} name="operacion">
                    <option value="">Seleccione la operación</option>
                    {Object.entries(operacion).map((row,key)=>{
                      return <option key={key} value={row[1]}>{row[0]}</option>
                    })}
                  </select>
                </div>
                <div className="col-6 mb-2">
                  <h5>Cantidad</h5>
                  <input className="form-control" onChange={onChange} name="cantidad" type="number" />
                </div>
                <div className="col-6 mb-2">
                  <h5>Color</h5>
                  <select className="form-control" onChange={onChange} name="color_token">
                    <option value="">Seleccione la operación</option>
                    {colores.map((row,key)=>{
                      return <option key={key} value={row.token}>{row.label}</option>
                    })}
                  </select>
                </div>
                <div className="col-6 mb-2">
                  <h5>Estilos</h5>
                  <select className="form-control" onChange={onChange} name="estilos_token">
                    <option value="">Seleccione la operación</option>
                    {estilos.map((row,key)=>{
                      return <option key={key} value={row.token}>{row.label}</option>
                    })}
                  </select>
                </div>
                <div className="col-12 mb-2">
                  <h5>Motivo</h5>
                  <select className="form-control" onChange={onChange} name="motivo">
                    <option value="">Seleccione el motivo de la operación</option>
                    {motivos.map((row,key)=>{
                      return <option key={key} value={row}>{row}</option>
                    })}
                  </select>
                </div>
                <div className="col-12 mb-2">
                  <h5>Descripción</h5>
                  <textarea className="form-control" onChange={onChange} name="descripcion" />
                </div>
                <div className="col-12 mb-2">
                  <button className="btn btn-primary mt-2 ml-1" type="submit">Grabar</button>
                  <div className="btn btn-danger mt-2 ml-1" onClick={()=>props.setOpen(false)} >Cancelar</div>
                </div>
              </div>
            </div>
          </form>
}

export default App
