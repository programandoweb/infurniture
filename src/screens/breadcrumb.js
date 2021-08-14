import React from 'react';
import StateContext from '../helpers/ContextState';
import Functions from '../helpers/Functions';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=()=>{
  const context = React.useContext(StateContext);
  if (Functions.segment()!=='') {
    let rows = Functions.segment("all")
    return  <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {rows.map((row,key)=>{
                  if (row==='') {
                    return <li key={key} className="breadcrumb-item"><a href={context.Config.ConfigAppUrl}>Home</a></li>
                  }else {
                    let anterior  = rows[key-1]!==undefined && rows[key-1]!==''?rows[key-1]+'/':''
                    return  <li key={key} className="breadcrumb-item text-capitalize">
                              <a href={context.Config.ConfigAppUrl+anterior+row+"?app="+queryStringParams.app}>{row.replace("_"," ").replace("_"," ").replace("_"," ")}</a>
                            </li>
                  }
                })}
              </ol>
            </nav>
  }else {
    return false;
  }

}
export default App
