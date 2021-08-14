const App=(props)=>{
  const element             =   document.createElement('div');
        element.textContent =   'Hello word';
        element.className   =   'container-fluid';
  return  <div className="btn btn-primary mr-1">{props.title}</div>

}
export default App
