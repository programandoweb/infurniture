import React from 'react';

function App(props)  {

  if (props.alert.show) {
    setTimeout(function(){ props.setAlert({show:false,message:""}) }, 10000);
  }

  function handleClose(){
    props.setAlert({show:false,message:""})
  }

  return (
    <div className={props.alert.show?"alert alert-danger alert-dismissible fade show":"d-none"} role="alert">
      <strong>Opss, error!</strong>
      <p>
        {props.alert.message}
      </p>
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={handleClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default App;
