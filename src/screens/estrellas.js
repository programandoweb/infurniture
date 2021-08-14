import React,{useState,useEffect} from 'react';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App=(props)=>{

  const [values, setValues]         = useState(props.calificacion!==undefined?props.calificacion:0);
  const [valueClick, setValueClick] = useState(0);

  const onMouseOver=(value)=>{
    if (valueClick===0 && props.block===undefined) {
      setValues(value)
    }
  }

  const onClick=(value)=>{
    if (props.block!==undefined && props.block) {
      return false;
    }
    setValueClick(value)
    setValues(value)
    let new_input=props.inputs
        new_input[props.name] = value;
        props.setInputs(new_input)
  }

  useEffect(() => {
    if (props.inputs!==undefined && props.inputs.calificacion!==undefined) {
      setValues(props.inputs.calificacion)
    }
  },[props.inputs])

  return  <>
            <FontAwesomeIcon onClick={()=>onClick(1)} className={values>0?"text-primary":""} icon={faStar} onMouseOver={()=>onMouseOver(1)}/>
            <FontAwesomeIcon onClick={()=>onClick(2)} className={values>1?"text-primary":""} icon={faStar} onMouseOver={()=>onMouseOver(2)}/>
            <FontAwesomeIcon onClick={()=>onClick(3)} className={values>2?"text-primary":""} icon={faStar} onMouseOver={()=>onMouseOver(3)}/>
          </>
}
export default App
