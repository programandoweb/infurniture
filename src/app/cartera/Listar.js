import Table from '../../screens/TableListGestionCartera';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{

  return    <>
              <Table
                app={queryStringParams.app}
                limit="1000"
                classHeader="pgrw-bg-success text-white"
                className="col-12 col-sm-12"
              />
            </>

}

export default App
