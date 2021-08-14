const App=(props)=>{

  const onClick=()=>{
    const ele,ment             =   document.createElement('div');
          element.textContent =   '+';
          element.className   =   (props.type!=='')?'position-relative cursor-pointer item container-'+props.type:'position-relative cursor-pointer item container';

    const row                     =   document.createElement('span');
          row.textContent       =   '11111';
          row.className   =   'ico'

    const navegacion              =   document.createElement('div');
          navegacion.textContent  =   '';
          navegacion.className    =   'navegacion'

          navegacion.append(row)

    const content =  document.getElementById(props.content);
          element.append(navegacion);
          content.append(element);

  }

  return  <div className="btn btn-primary mr-1" onClick={onClick}>{props.title}</div>

}
export default App
