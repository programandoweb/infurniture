import React,{useState,useEffect} from 'react';
import StateContext from '../../helpers/ContextState';
import Functions from '../../helpers/Functions';
import Input from '../../screens/inputs';
import Textarea from '../../screens/textarea';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const test                  =   false
const elements              =   {
                                  label:test,
                                  descripcion:test,
                                  creditos:test,
                                  facebook:test,
                                  twitter:test,
                                  instagram:test,
                                  youtube:test,
                                  whatsapp:test,
                                  email:test,
                                  email_nombre:test,
                                  email_sujeto:test,
                                  SMTP_Usuario:test,
                                  SMTP_Clave:test,
                                  SMTP_Puerto:test,
                                  SMTP_Servidor:test,
                                }

const App =()=>{

  const context             =   React.useContext(StateContext);
  const [inputs, setInputs] =   useState(elements);
  const modulo              =   Functions.segments_modulos(queryStringParams.app);

  const onChange=(e)=>{
    let inputs_ =   {...inputs};
        inputs_[e.target.name]=e.target.value
        setInputs(inputs_)
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    let data        =   inputs
        data.user   =   context.Store.get("user").token
        data.app    =   JSON.stringify(modulo)
    Functions.PostAsync("Configuracion","set",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue=(data)=>{
    context.setModalShow({
      show:true,
      footer:true,
      message:<div className="text-center">Los datos han sido guardados correctamente</div>,
    })
  }

  useEffect(() => {
    getInit()
  },[])

  const getInit=()=>{
    let data                =   {}
        data.user           =   context.Store.get("user").token
        data.grupo          =   "default"
        data.app            =   JSON.stringify(modulo)
    Functions.PostAsync("Configuracion","get",data,context,{name:"callbackInit",funct:callbackInit})
  }

  const callbackInit=(data)=>{
    setInputs(data.response.data)
  }

  return  <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-content">
                    <form onSubmit={onSubmit}>
                      <div className="card-body">
                        <Input
                            defaultValue={test?test:inputs.label}
                            autocomplete="off"
                            limiteCaracteres="70"
                            title="¿Cómo titulas tu website?"
                            type="text"
                            name="label"
                            className="form-control"
                            onChange={onChange}
                        />
                        <Textarea
                            defaultValue={test?test:inputs.descripcion}
                            limiteCaracteres="170"
                            title="Describe el website"
                            name="descripcion"
                            className="form-control"
                            onChange={onChange}
                        />
                        <Textarea
                            defaultValue={test?test:inputs.creditos}
                            title="Créditos en el pié de página"
                            name="creditos"
                            className="form-control"
                            onChange={onChange}
                        />
                        <div className="row">
                          <div className="col">
                            <Input
                                defaultValue={inputs.facebook}
                                title="Facebook"
                                type="text"
                                name="facebook"
                                className="form-control"
                                onChange={onChange}
                            />
                          </div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.twitter}
                                title="Twitter"
                                type="text"
                                name="twitter"
                                className="form-control"
                                onChange={onChange}
                            />
                          </div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.instagram}
                                title="Instagram"
                                type="text"
                                name="instagram"
                                className="form-control"
                                onChange={onChange}
                            />
                          </div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.youtube}
                                title="Youtube"
                                type="text"
                                name="youtube"
                                className="form-control"
                                onChange={onChange}
                            />
                          </div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.whatsapp}
                                title="Whatsapp"
                                type="text"
                                name="whatsapp"
                                className="form-control"
                                onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="row bg-primary pt-3 pb-3 sombra mb-2">
                          <div className="h3 mt-2 mb-2 col-12 text-white"> Configuración del correo para el sistema</div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.email}
                                title="Correo electrónico"
                                type="text"
                                name="email"
                                className="form-control"
                                classNameLabel="text-white"
                                onChange={onChange}
                            />
                          </div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.email_nombre}
                                title="Correo Nombre"
                                type="text"
                                name="email_nombre"
                                className="form-control"
                                classNameLabel="text-white"
                                onChange={onChange}
                            />
                          </div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.email_sujeto}
                                title="Sujeto de los mensajes"
                                type="text"
                                name="email_sujeto"
                                className="form-control"
                                classNameLabel="text-white"
                                onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="row bg-secondary pt-3 pb-3 sombra">
                          <div className="h3 mt-2 mb-2 col-12 text-white"> Configuración técnica del STMP</div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.SMTP_Usuario}
                                title="SMTP Usuario"
                                type="text"
                                name="SMTP_Usuario"
                                className="form-control"
                                classNameLabel="text-white"
                                onChange={onChange}
                            />
                          </div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.SMTP_Clave}
                                title="SMTP Clave"
                                type="password"
                                name="SMTP_Clave"
                                className="form-control"
                                classNameLabel="text-white"
                                onChange={onChange}
                            />
                          </div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.SMTP_Servidor}
                                title="SMTP Servidor"
                                type="text"
                                name="SMTP_Servidor"
                                className="form-control"
                                classNameLabel="text-white"
                                onChange={onChange}
                            />
                          </div>
                          <div className="col">
                            <Input
                                defaultValue={inputs.SMTP_Puerto}
                                title="SMTP Puerto"
                                type="text"
                                name="SMTP_Puerto"
                                className="form-control"
                                classNameLabel="text-white"
                                onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="row justify-content-center pt-3">
                          <div className="col-3 text-center">
                            <button className="btn btn-primary btn-block" type="submit">Guardar</button>
                          </div>
                          <div className="col-3 text-center">
                            <a href="../websites?app=listar::modulos::paginasWeb::Páginas Web::websites::1" className="btn btn-danger btn-block text-white">
                              Cerrar
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
}
export default App
