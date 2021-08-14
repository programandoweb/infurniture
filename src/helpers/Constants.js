const exportar  = {
  Development : 'ProgramandoWeb',
  Title:'Mi Selección',
  LogoSm:'./images/ico-md.png',
  View:'Title',
  Modulos:{
    auth:{
      public:false,
      register:{
        url:"auth/register",
        ico:"",
      },
      login:{
        url:"auth/login",
        ico:"",
      },
      recover:{
        url:"auth/recover",
        ico:"",
      },
      recoverPass:{
        url:"auth/recoverPass",
        ico:"",
      },
      luisadelgado:{
        url:"luisadelgado",
        ico:"",
      },
    },
    usuarios:{
      public:true,
      label:"Usuarios",
      url:"usuarios/usuarios_listado",
      dropdown:true,
      items:[{
              todos:{
                public:true,
                label:"Lista",
                url:"usuarios/lista",
                metodo:"listar",
                ico:"",
                items:[
                  {
                    password:{
                        public:false,
                        label:"Cambiar Password",
                        url:"usuarios/changePass",
                        metodo:"listar",
                        ico:"",
                      },
                  },
                  {
                    edit_user:{
                        public:false,
                        label:"Editar Usuario",
                        url:"usuarios/edit",
                        metodo:"listar",
                        ico:"",
                      },
                  },
                  {
                    rel_user:{
                        public:false,
                        label:"Relaciones de Usuario",
                        url:"usuarios/relUsers",
                        metodo:"listar",
                        ico:"",
                      },
                  },
                  {
                    ver_perfil_user:{
                        public:false,
                        label:"Ver perfil de usuarios",
                        url:"usuarios/profileUser",
                        metodo:"listar",
                        ico:"",
                      },
                  },{
                    registrar:{
                        public:false,
                        label:"Registrar",
                        url:"usuarios/registrar",
                        metodo:"registrar",
                        ico:"",
                      },
                  },{
                    editar:{
                      public:false,
                      label:"Editar",
                      url:"usuarios/editar",
                      metodo:"editar",
                      ico:"",
                    }
                  },{
                    eliminar:{
                      public:false,
                      label:"Eliminar",
                      metodo:"delete",
                      url:"usuarios/eliminar",
                      ico:"",
                    }
                  },{
                    deactivar:{
                      public:false,
                      label:"Desactivar",
                      metodo:"desactivar",
                      url:"usuarios/deactivar",
                      ico:"",
                    }
                  }
                ]
              },
            },
          ]
    },
    configuracion:{
      public:true,
      label:"Configuración",
      url:"configuracion/configurar",
      dropdown:true,
      items:[{
          tipos_usuarios:{
              public:true,
              label:"Tipo de usuarios",
              url:"configuracion/tipos_de_usuarios",
              metodo:"listar",
              ico:"",
            },
        },
        {
          tablas_maestras:{
            public:true,
            label:"Tablas Maestras",
            url:"configuracion/tablas_maestras",
            metodo:"listar",
            ico:"",
          },
        },
        {
          tablas_maestras:{
            public:true,
            label:"Configuración del sistema",
            url:"configuracion/sistema",
            metodo:"listar",
            ico:"",
          },
        }
      ]
    },
    modulos:{
      public:true,
      label:"Módulos",
      url:"#",
      dropdown:true,
      items:[{
          clientes:{
            public:true,
            label:"Clientes",
            url:"clientes",
            metodo:"clientes",
            ico:"",
            items:[
              { listar:{
                    public:false,
                    label:"Listar Clientes",
                    url:"#",
                    metodo:"listar_clientes",
                    ico:"",
                  },
              },
              { add_client:{
                    public:false,
                    label:"Agregar Cliente",
                    url:"#",
                    metodo:"listar",
                    ico:"",
                  },
              },
              {
                editar:{
                      public:false,
                      label:"Editar Clientes",
                      url:"#",
                      metodo:"listar",
                      ico:"",
                    },
              },{
                cambiar:{
                      public:false,
                      label:"Cambiar Categoría",
                      url:"#",
                      metodo:"listar",
                      ico:"",
                    },
              },{
                cliente_search:{
                      public:false,
                      label:"Ver información del cliente",
                      url:"#",
                      metodo:"listar",
                      ico:"",
                    },
              },{ view_messages_client:{
                    public:false,
                    label:"Ver comunicación con el cliente",
                    url:"#",
                    metodo:"listar",
                    ico:"",
                  },
              },{ send_messages_client:{
                    public:false,
                    label:"Enviar comunicación al cliente",
                    url:"#",
                    metodo:"SetEvento",
                    ico:"",
                  },
              },{ create_event_client:{
                    public:false,
                    label:"Crear eventos con el cliente",
                    url:"#",
                    metodo:"SetMensaje",
                    ico:"",
                  },
              },{ view_messages_client_ver_perfil_usuario:{
                    public:false,
                    label:"Ver perfil de quién se comunica con el cliente",
                    url:"Usuarios/perfil",
                    metodo:"listar",
                    ico:"",
                  },
              },
            ]},
        },{
            ventas:{
              public:true,
              label:"Ventas",
              url:"ventas",
              ico:"",
              metodo:"listar",
            },
        },{
            GestionInventario:{
              public:true,
              label:"Gestión inventario",
              url:"GestionInventario",
              ico:"",
              metodo:"listar",
              items:[
                {
                  ListarItemsArticulos:{
                      public:false,
                      label:"Listar Items artículos",
                      url:"GestionInventario/ListarItemsArticulos",
                      metodo:"ListarItemsArticulos",
                      ico:"",
                  },
                },{
                  AgregarItems:{
                      public:false,
                      label:"Agregar Items artículos",
                      url:"GestionInventario/AgregarItemsArticulos",
                      metodo:"AgregarItemsArticulos",
                      ico:"",
                  },
                },{
                  EditarItems:{
                      public:false,
                      label:"Editar Items artículos",
                      url:"GestionInventario/EditarItemsArticulos",
                      metodo:"EditarItemsArticulos",
                      ico:"",
                  },
                },{
                  RechargeInventaryItem:{
                      public:false,
                      label:"Alimentar Items artículos",
                      url:"GestionInventario/RechargeInventaryItem",
                      metodo:"RechargeInventaryItem",
                      ico:"",
                  },
                },
              ]
            }
          },{
            getionClientes:{
              public:true,
              label:"Gestión cliente",
              url:"gestion_Clientes",
              ico:"",
              metodo:"listar",
              items:[
                {
                  listarClientes:{
                      public:false,
                      label:"Listar Clientes",
                      url:"gestionClientes/listarClientes",
                      metodo:"ListarClientes",
                      ico:"",
                    },
                },
                {
                  agregarClientes:{
                      public:false,
                      label:"Agregar Clientes",
                      url:"gestionClientes/agregarClientes",
                      metodo:"AgregarClientes",
                      ico:"",
                    },
                },
                {
                  editarClientes:{
                      public:false,
                      label:"Editar Clientes",
                      url:"gestionClientes/agregarClientes",
                      metodo:"EditarClientes",
                      ico:"",
                    },
                },
                {
                  verClientes:{
                      public:false,
                      label:"Ver datos del clientes",
                      url:"gestionClientes/verDatosDelCliente",
                      metodo:"VerDatosDelCliente",
                      ico:"",
                    },
                },
                {
                  pdfClientes:{
                      public:false,
                      label:"Generar PDFs Clientes",
                      url:"gestionClientes/generarPDFDelCliente",
                      metodo:"GenerarPDFDelCliente",
                      ico:"",
                    },
                },
                {
                  verPropiedadesDeClientes:{
                      public:false,
                      label:"Ver Propiedades de cliente",
                      url:"gestionClientes/verPropiedadesDeClientes",
                      metodo:"VerPropiedadesDeClientes",
                      ico:"",
                    },
                },
                {
                  verHistoricoDeContactosConClientes:{
                      public:false,
                      label:"Ver histórico de contactos con el cliente",
                      url:"gestionClientes/verHistoricoDeContactosConClientes",
                      metodo:"VerHistoricoDeContactosConClientes",
                      ico:"",
                    },
                },
                {
                  verHistoricoDeContratosConClientes:{
                      public:false,
                      label:"Ver histórico de contratos con el cliente",
                      url:"gestionClientes/verHistoricoDeContratosConClientes",
                      metodo:"VerHistoricoDeContratosConClientes",
                      ico:"",
                    },
                },
                {
                  envioPortafolioClientes:{
                      public:false,
                      label:"Envío de portafolio al cliente",
                      url:"gestionClientes/envioPortafolioClientes",
                      metodo:"EnvioPortafolioClientes",
                      ico:"",
                    },
                },
                {
                  gestionVisitaComercialClientes:{
                      public:false,
                      label:"Gestión visita comercial al cliente",
                      url:"gestionClientes/gestionVisitaComercialClientes",
                      metodo:"GestionVisitaComercialClientes",
                      ico:"",
                    },
                },
                {
                  ventasClientes:{
                      public:false,
                      label:"Ventas al cliente",
                      url:"gestionClientes/ventasClientes",
                      metodo:"VentasClientes",
                      ico:"",
                    },
                },
                {
                  cotizacionesClientes:{
                      public:false,
                      label:"Cotizaciones al cliente",
                      url:"gestionClientes/cotizacionesClientes",
                      metodo:"CotizacionesClientes",
                      ico:"",
                    },
                },
                {
                  ordenDeServiciosClientes:{
                      public:false,
                      label:"Ordenes de servicios al cliente",
                      url:"gestionClientes/ordenDeServiciosClientes",
                      metodo:"OrdenDeServiciosClientes",
                      ico:"",
                    },
                },
              ]
            },
        },{
            Cotizaciones:{
              public:true,
              label:"Cotizaciones",
              url:"cotizaciones",
              ico:"",
              metodo:"listar",
              items:[
                {
                  listarCotizaciones:{
                      public:false,
                      label:"Listar Cotizaciones",
                      url:"cotizaciones/listarCotizaciones",
                      metodo:"listarCotizaciones",
                      ico:"",
                    },
                },
                {
                  agregarCotizaciones:{
                      public:false,
                      label:"agregar Cotizaciones",
                      url:"cotizaciones/agregarCotizaciones",
                      metodo:"agregarCotizaciones",
                      ico:"",
                    },
                },
                {
                  eliminarCotizaciones:{
                      public:false,
                      label:"eliminar Cotizaciones",
                      url:"cotizaciones/eliminarCotizaciones",
                      metodo:"eliminarCotizaciones",
                      ico:"",
                    },
                },
              ]
            },
        },{
            Ordenes:{
              public:true,
              label:"Ordenes de servicios",
              url:"ordenes",
              ico:"",
              metodo:"listar",
              items:[
                {
                  listarOrdenes:{
                      public:false,
                      label:"Listar Ordenes",
                      url:"ordenes/listarOrdenes",
                      metodo:"listarOrdenes",
                      ico:"",
                    },
                },{
                  eliminarOrdenes:{
                      public:false,
                      label:"eliminar Ordenes",
                      url:"cotizaciones/eliminarOrdenes",
                      metodo:"eliminarOrdenes",
                      ico:"",
                    },
                },
              ]
            },
        },{
            Informes:{
              public:true,
              label:"Relación cliente asesor",
              url:"informes",
              ico:"",
              metodo:"listar",
              items:[
                {
                  listarRelacion:{
                      public:false,
                      label:"Listar Relaciones",
                      url:"informes/listarRelaciones",
                      metodo:"listarRelaciones",
                      ico:"",
                    },
                },
              ]
            },
        },{
            Cotizaciones:{
              public:true,
              label:"Listar Cotizaciones Clientes",
              url:"cotizaciones/listarCotizacionesClientes",
              ico:"",
              metodo:"listarClientesRelacion",
              items:[
                {
                  listarCotizacionesClientes:{
                      public:false,
                      label:"Listar Cotizaciones Clientes",
                      url:"cotizaciones/listarCotizacionesClientes",
                      metodo:"listarClientesRelacion",
                      ico:"",
                    },
                },
              ]
            },
        },{
            paginasWeb:{
              public:true,
              label:"Páginas Web",
              url:"websites",
              metodo:"listar",
              ico:"",
            },
        },{
            commerce:{
              public:true,
              label:"Comercio Electrónico",
              url:"websites",
              metodo:"listar",
              ico:"",
            },
        },{
            documentos:{
              public:true,
              label:"Gestión documentos",
              url:"documentos",
              metodo:"listar",
              ico:"",
            },
        },{
            blogs:{
              public:true,
              label:"Blogs",
              url:"blogs",
              metodo:"listar",
              ico:"",
            },
        },{
            citas:{
              public:true,
              label:"Gestión de citas",
              url:"blogs",
              metodo:"listar",
              ico:"",
            },
        },{
            payU:{
              public:true,
              label:"Gestión de pasarelas de pagos",
              url:"payu",
              metodo:"listar",
              ico:"",
            },
        },{
            GestionHumana:{
              public:true,
              label:"Gestión de humana",
              url:"gestion_humana",
              metodo:"listar",
              ico:"",
            },
        },{
            GestionProyectos:{
              public:true,
              label:"Gestión de proyectos",
              url:"gestion_proyectos",
              metodo:"listar",
              ico:"",
            },
        },
      ]
    },
    reporte:{
      public:false,
      label:"Reporte",
      url:"reportes/reporte",
      dropdown:true,
      items:[{
          entrenamientos:{
            public:true,
            label:"RPE",
            url:"reportes/rpe",
            ico:"",
          },
        },
      ]
    },
    cambio_usuario:{
      public:false,
      label:"Cambio de Usuario",
      url:"usuarios/cambio_usuario",
      dropdown:false,
    },
    contrasena:{
      public:true,
      label:"Contraseña",
      url:"#",
      dropdown:false,
      modal:false,
    },
    cerrar_sesion:{
      label:"Cerrar Sesión",
      url:"Cerrar",
    },
  }
}


export default  exportar
