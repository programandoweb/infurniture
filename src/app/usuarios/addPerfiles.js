import React from 'react';
import Funcionario from "./formularios/funcionario";
import Cliente from "./formularios/cliente";
import Contratista from "./formularios/contratista";
import Default from "./formularios/default";
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{
  const Render=()=>{
    switch (queryStringParams.filter) {
      case "3":
        return <Funcionario/>
      break;
      case "4":
        return <Cliente/>
      break;
      case "5":
        return <Contratista/>
      break;
      default:
        return <Default/>
    }
  }

  return  <Render/>
}

export default  App
