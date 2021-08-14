import React from 'react';
import StateContext from '../../helpers/ContextState'
import Functions from "../../helpers/Functions";
import Logo from '../../assets/images/design/logo.png';

const App=(props)=>{

  const context     =   React.useContext(StateContext);

  const onSubmit    = () => {
    let data        = {}
        data.token  = Functions.segment()
        Functions.PostAsync("User","recoverPassPWA",data,context,{name:"callbackContinue",funct:callbackContinue})
  }

  const callbackContinue    = (data) => {
    if(data.response.continue){
      context.Store.set("user",data.response.store.user)
      context.setUser(data.response.store.user)
      document.location.href=context.Config.ConfigAppUrl+"apanel"
    }else {
      context.setAlert({show:true,message:data.message})
    }
  }

  onSubmit()

  return  <div className="container auth">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 mt-3">
                <form onSubmit={onSubmit}>
                  <div className="card">
                    <div className="card-body">
                      <div className="text-center">
                        <img src={Logo} alt="" className="img-fluid p-5"/>
                      </div>
                      <div className="row mb-3 text-center">
                        <div className="col">
                          Por favor espere...
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
}

export default App;
