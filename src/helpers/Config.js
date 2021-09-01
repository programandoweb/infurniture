const exportar  = {
  Prefijo:"/pwa",
  ConfigAppUrl : (document.location.hostname==='localhost')?window.location.origin+'/': (process.env.NODE_ENV==='development')?'https://software.programandoweb.net/':'https://software.programandoweb.net/',
  ConfigSocketUrl : (document.location.hostname==='localhost')?'https://socket.programandoweb.net:10081/':(process.env.NODE_ENV==='development')?'https://socket.programandoweb.net:10081/':'https://socket.programandoweb.net:10081/',
  ConfigNotifications:process.env.REACT_APP_URL_NOTIFICATIONS,
  //ConfigApirest   : (document.location.hostname==='localhost')?'https://programandoweb.net/backend/apirest/':(process.env.NODE_ENV==='development')?'https://programandoweb.net/backend/apirest/':'https://programandoweb.net/backend/apirest/',
  ConfigApirest   : (document.location.hostname==='localhost')?'http://localhost/infurnitureapi/apirest/':(process.env.NODE_ENV==='development')?'https://programandoweb.net/backend/apirest/':'https://programandoweb.net/backend/apirest/',
  Title:'InFurniture',
  Alt:'InFurniture',
  db:"InFurniture",
}

export default exportar
