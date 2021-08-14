import Table from '../../screens/TableListCotizaciones';
import queryString from 'query-string';
const queryStringParams = queryString.parse(window.location.search);

const App=(props)=>{

  return    <Table
              app={queryStringParams.app}
              limit="8"
              classHeader="pgrw-bg-success text-white"
              className="col-12 col-sm-12"
            />

}

export default App
