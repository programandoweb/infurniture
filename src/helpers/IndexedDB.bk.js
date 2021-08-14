import Config from "./Config";
import socketIOClient from "socket.io-client";
import Store from './Store'

const Socket = socketIOClient(Config.ConfigSocketUrl);



let indexedDB       =   window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let IDBTransaction  =   window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
let IDBKeyRange     =   window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

let db_name         =   'InSchool';
var db;

let CrearTareas,
    Crear_actualizaciones_y_conexiones_usuarios,
    Add_actualizaciones_y_conexiones_usuarios,
    Add_evaluations_by_child,
    random,
    token,
    dateToMYSQL,
    InitDb,
    GetEvaluaciones;
var objectStore;

if (!window.indexedDB) {
    alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
}else {

  dateToMYSQL=(datx)=>{
    var d = new Date(datx),
      month = '' + (d.getMonth() + 1),
      day = d.getDate().toString(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  random=()=>{
      return Math.random().toString(36).substr(2); // Eliminar `0.`
  };

  token=()=>{
      return random() + random(); // Para hacer el token más largo
  };

  InitDb              =   async function InitDb(data) {

    indexedDB.deleteDatabase(db_name)

    let request       =   indexedDB.open(db_name,1);

    request.onerror   =   function(event) {
      console.log(event);
    };

    request.onsuccess =   function(event) {
      db              =   event.target.result;
      return db
    };

    request.onupgradeneeded = function(event) {
      db              =    event.target.result;
      Object.entries(data).map((v,k)=>{
        let campo     =   v[0]
        let data      =   v[1]
        objectStore   =   db.createObjectStore(campo, {keyPath:'id',autoIncrement: true} );
        Object.entries(data).map((v2,k2)=>{
          objectStore.createIndex(v2[1].name, v2[1].name, { unique: false });
        })
      })
    };

  }

  Add_evaluations_by_child = async function Add_evaluations_by_child(data) {

    indexedDB.deleteDatabase(db_name)

    let request       =   indexedDB.open(db_name,1);
    request.onerror   =   function(event) {
      console.log(event);
    };

    request.onsuccess =   function(event) {
      db              =   event.target.result;
    };

    request.onupgradeneeded = function(event) {
      db              =     event.target.result;
      let tabla       =     data.tabla
      objectStore     =     db.createObjectStore(tabla, {keyPath:'id',autoIncrement: true} );

      Object.entries(data.campos).map((v2,k2)=>{
        objectStore.createIndex(v2[0], v2[1], { unique: false });
      })

      objectStore.createIndex("alumno_id", "alumno_id", { unique: false });

      Object.entries(data.data.evaluations_by_child).map((v2,k2)=>{
        let alumno_id = v2[0];
        Object.entries(v2[1]).map((v3,k3)=>{
          let info                =   v3[1];
              info.alumno_id      =   alumno_id;
          var request_i           =   objectStore.add(info);
              request_i.onsuccess = function(event) {};
        })
      })
    };

  }

  Add_actualizaciones_y_conexiones_usuarios = async function Add_actualizaciones_y_conexiones_usuarios() {
    let today  =  new Date();
    let info  = {
      keyPath:"actualizaciones_y_conexiones_usuarios",
      table:"conexion",
      collection:{
        actualizacion_id:1,
        token_remoto:token(),
        fecha:dateToMYSQL(today),
        usuario_id:(Store.get("user").usuario_id!==undefined)?Store.get("user").usuario_id:0,
        modulo:"Open App",
        ubicacion:1,//UBICACION MÓVIL 2 = BACKEND
      }
    }

    let request       =   indexedDB.open(db_name,1);
    request.onerror   =   function(event) {
      console.log(event);
    };

    request.onsuccess =   function(event) {
      db              =   event.target.result;
      var transaction =   db.transaction(["actualizaciones_y_conexiones_usuarios"], "readwrite");
      transaction.oncomplete = function(event) {};
      transaction.onerror = function(event) {
        console.log("transaction",event);
      };

      var objectStore =   transaction.objectStore("actualizaciones_y_conexiones_usuarios");

      var index       =   objectStore.index("fecha");
          index.get(dateToMYSQL(today)).onsuccess = function(event) {
            if (event.target.result===undefined) {
              var request_i           = objectStore.add(info.collection);
                  request_i.onsuccess = function(event) {};
            }else {
              //     index.usuario_id        = info.collection.usuario_id
              // // console.log("update",index);
              // var request_u           = objectStore.put(info.collection);
              //     request_u.onsuccess = function(event) {
              //       console.log(event);
              //     };
            }
          };
    };
  }

  GetEvaluaciones     =   async function GetEvaluaciones(){
    return new Promise(function(resolve, reject){
        let request       =   indexedDB.open(db_name,1);
        request.onerror   =   function(event) {
          console.log(event);
        };
        request.onsuccess =   function(event) {
          db              =   event.target.result;
          var objectStore =   db.transaction("evaluaciones").objectStore("evaluaciones");
          objectStore.getAll().onsuccess = function(event) {
            resolve(event.target.result);
          }
        }
    });
  }

  Crear_actualizaciones_y_conexiones_usuarios = async function Crear_actualizaciones_y_conexiones_usuarios() {
    let today  =  new Date();
    let info  = {
      keyPath:"actualizaciones_y_conexiones_usuarios",
      table:"conexion",
      collection:{
        token_remoto:token(),
        fechaJS:today.toString('%Y-%m-%d'),
        fecha:dateToMYSQL(today),
        usuario_id:(Store.get("user").usuario_id!==undefined)?Store.get("user").usuario_id:0,
        modulo:"Open App",
        ubicacion:1,//UBICACION MÓVIL 2 = BACKEND
      }
    }

    let request       =   indexedDB.open(db_name,1);

    request.onerror   =   function(event) {
      console.log(event);
    };

    request.onsuccess =   function(event) {
      db              =   request.result;
    };

    request.onupgradeneeded = function(event) {
      db            =   request.result;
      console.log(db);
    }

  }

}

export {
  CrearTareas,
  Crear_actualizaciones_y_conexiones_usuarios,
  InitDb,
  Add_actualizaciones_y_conexiones_usuarios,
  Add_evaluations_by_child,
  GetEvaluaciones,
}
