import React from 'react';
import ReactDOM from 'react-dom';
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import '../assets/common.css';

const { animType, setAnimCompToTagComp } = BannerAnim;
/*AQUI EL CUSTOM*/

animType.custom = (elem, type, direction, animData) => {
  //console.log(`custom animType, type:${type}`); // eslint-disable-line no-console
  let _y;
  const props = { ...elem.props };
  let children = props.children;
  //console.log(props);
  if (type === 'enter') {
    _y = direction === 'next' ? '100%' : '-100%';
  } else {
    _y = direction === 'next' ? '-10%' : '10%';
    children = React.Children.toArray(children).map(setAnimCompToTagComp);
  }
  return React.cloneElement(elem, {
    ...props,
    animation: {
      ...animData,
      y: _y,
      type: type === 'enter' ? 'from' : 'to',
    },
  }, children);
};

const { Element }   = BannerAnim;
const BgElement     = Element.BgElement;


const App=(props)=>{
  return  <BannerAnim type="custom">
            {props.data.map((row,key)=>{
              //console.log(row);
              return <Element key={key} prefixCls="banner-user-elem">
                        <BgElement  key="bg"
                                    className="bg"
                                    style={{
                                      backgroundImage: 'url('+row.src+')',
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                    }}

                        />
                        {row.label!==undefined && row.label!==""? <QueueAnim name="QueueAnim">
                                                                    <h1 key="h1">{row.label}</h1>
                                                                    <p key="p">{row.text2}</p>
                                                                  </QueueAnim>:false}
                        {row.TweenOne!==undefined && row.TweenOne!==""?<TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne">
                          {row.TweenOne}
                        </TweenOne>:false}
                      </Element>
            })}
          </BannerAnim>
}

export default App
