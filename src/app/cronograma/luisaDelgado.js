import React,{useState,useEffect} from 'react';
import imageo0 from '../../assets/luisa/imageo0.jpg'
import image0 from '../../assets/luisa/image0.jpg'
import image1 from '../../assets/luisa/image1.jpg'
import image2 from '../../assets/luisa/image2.jpg'
import image3 from '../../assets/luisa/image3.jpg'
import image4 from '../../assets/luisa/image4.jpg'
import image5 from '../../assets/luisa/image5.jpg'
import image6 from '../../assets/luisa/image6.jpg'
import image7 from '../../assets/luisa/image7.jpg'
import image8 from '../../assets/luisa/image8.jpg'
import image9 from '../../assets/luisa/image9.jpg'
import image10 from '../../assets/luisa/image10.jpg'
import Logo from '../../assets/luisa/favicon.png'
import LogoFenix from '../../assets/luisa/fenix.jpg'

const mensajes=[
  {
      message:"Quiero contarte algo!",
      image:imageo0,
  },
  {
      message:"Te conocí de forma casual, te vi en facebook y me llamó la atención",
      image:image0,
  },
  {
      message:"Nuestra primeras conversaciones fueron muy normal, no iban más allá que saludos",
      image:image2,
  },
  {
      message:"Un día tuve la oportunidad de verte en la calle, y ya sabes qué me cautivó",
      image:image1,
  },
  {
      message:"Luego comenzaron las coversaciones, hasta que llegamos al punto de conocernos personalmente",
      image:image3,
  },
  {
      message:"Por cierto que del mensaje anterior, que rico es besar esos labios suyos",
      image:image4,
  },
  {
      message:"Luego comenzamos a hablar sobre vivir juntos, pusimos como fecha un 15 de Octubre pero nos mudamos antes",
      image:image5,
  },
  {
      message:"Jorge vivió una temporada muy bonita contigo, tuvimos problemas y luego nos separamos",
      image:image6,
  },
  {
      message:"Luisa Fernanda, sólo nos separamos para encontrarnos de nuevo",
      image:image7,
  },
  {
      message:"Actualmente nos encontramos en una situación difícil, la intelerancia nos está matando",
      image:image8,
  },
  {
      message:"Sólo te pido que luchemos, no se puede tirar a la basura todo lo que hemos alcanzado",
      image:image9,
  },
  {
      message:"Te amo mucho esposa, nunca lo olvides, entre nosotros hay algo especial que nunca terminará",
      image:image10,
  },
]

const App=(props)=>{
  const [contador, setContador]   =   useState(0);
  useEffect(() => {
    let title   = "Te amo Luisa Fernanda"
    let text    = "Quiero compartir algo contigo"
    props.serviceWorkerRegistration.sendNotification(Logo,title,text,LogoFenix);
  },[])
  return  <div className="container">
            <div className="row mb-3">
              <div className="col-12 text-center">
                <div className="p-1 h2">
                  Hola, Luisa
                </div>
              </div>
              <div className="col-12 col-sm-8 text-center mb-2 h5">

                  {mensajes[contador].message}

              </div>
              <div className="col-12 col-sm-4 text-center">

                 <img src={mensajes[contador].image} className="img-fluid"/>

              </div>
            </div>
            <div className={mensajes.length===contador+1?"d-none":"row mb-3"}>
              <div className="col text-center">
                <div className="btn btn-primary" onClick={()=>setContador(contador+1)}>
                  Continuar leyendo mi amor
                </div>
              </div>
            </div>
          </div>
}

export default App;
