import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Config from '../helpers/Config';
let responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const App=(props)=>{
  //console.log(props.row.cantidad);
  if (props.row.cantidad!==undefined) {
    responsive.desktop.items  = parseInt(props.row.cantidad)
  }

  return <section className={props.row.clases}>
          <div className={props.classNameMain?props.classNameMain:"container-fluid"}>
            {props.title? <div className="row">
                            <div className="col">
                              <h3 className="">
                                {props.title}
                              </h3>
                            </div>
                          </div>:false}
            <Carousel
              responsive={responsive}
              showDots={true}
              draggable={true}
              infinite={true}
              autoPlaySpeed={2000}
              autoPlay={true}
              itemClass="item-pgrw"
            >
              {props.row.data.map((row,key)=>{
                return  <div className="col position-relative hover-main-resize" key={key}>
                          <div className="card border-secondary mb-3 hover-resize bg-white">
                            <img className="card-img-top" src={row.src} alt="Card image cap"/>
                            <div className="card-body">
                              <div className="card-content">
                                <div>{row.label}</div>
                                <div>{row.SEO_descripcion}</div>
                                <div className="text-right">
                                  <a title={row.label} className="btn btn-primary" href={Config.ConfigAppUrl+"web/tienda/"+row.url+"::"+row.token}>Ver Producto</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
              })}
            </Carousel>
          </div>
        </section>
}

export default App
