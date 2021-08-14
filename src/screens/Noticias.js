import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
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
  return  <section className={props.row.clases}>
            <div className="container-fluid">
            {props.title? <div className="row">
                            <div className="col">
                              <h3 className="">
                                {props.title}
                              </h3>
                            </div>
                          </div>:false}
            <div className="row">
              <div className="col">
                <Carousel responsive={responsive}>
                  {
                    props.row.data.map((row,key)=>{
                      return  <div className="col" key={key}>
                                <div className="card border-secondary mb-3">
                                  <img className="card-img-top" src={row.src} alt="Card image cap"/>
                                  <div className="card-body">
                                    <div className="card-content">
                                      <div>{row.label}</div>
                                      <div>{row.noticia_corta}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                    })
                  }
                </Carousel>
              </div>
            </div>
          </div>
        </section>
}
export default App
