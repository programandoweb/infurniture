import notFound from '../assets/images/design/not-found.gif'
const Format404 = (props)=>{
  return  <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 text-center">
                <img src={notFound} alt="PGRW" className="img-fluid"/>
                <h1>Ups... 404</h1>
              </div>
            </div>
          </div>
}
export default Format404
