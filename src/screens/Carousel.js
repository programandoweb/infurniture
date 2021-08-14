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
  return <section className={props.data.clases}><div className={props.classNameMain?props.classNameMain:"container-fluid"}>
            {props.title? <div className="row">
                            <div className="col">
                              <h3 className="">
                                {props.title}
                              </h3>
                            </div>
                          </div>:false}
            <Carousel
              responsive={responsive}
              showDots={props.data.showDots}
              draggable={props.data.draggable}
              infinite={props.data.infinite}
              autoPlay={props.data.autoPlay}
            >
              {props.data.data.map((row,key)=>{
                return  <div className="col" key={key}>
                          <div className="card border-secondary mb-3">
                            <img className="card-img-top" src={row.src} alt="Card image cap"/>
                            <div className="card-header">
                              {row.label}
                            </div>
                            <div className="card-body">
                              <div className="card-content">
                                <div>{row.text1}</div>
                                <div>{row.text2}</div>
                                <div>{row.TweenOne}</div>
                              </div>
                            </div>
                          </div>
                        </div>
              })}
            </Carousel>
          </div></section>
}

export default App
