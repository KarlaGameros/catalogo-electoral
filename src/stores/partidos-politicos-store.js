import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePartidosPoliticosStore = defineStore(
  "usePartidosPoliticosStore",
  {
    state: () => ({
      modal: false,
      modalIntegracion: false,
      isEditar: false,
      list_Partidos_Politicos: [],
      list_Partidos_Comun: [],
      partido: {
        id: null,
        nombre: null,
        siglas: null,
        logo_URL: null,
        independiente: false,
        prioridad: null,
        is_Comun: false,
        pantone_Letra: null,
        pantone_Fondo: null,
        is_Coalicion: false,
        coalicion_Id: null,
        coalicion: null,
        orden_Publicacion: null,
      },
      comun: {
        partido_Padre_Id: null,
        partido_Id: null,
        porcentaje: null,
        activo: true,
      },
    }),
    actions: {
      //----------------------------------------------------------------------
      //INIT PARTIDO
      initPartido() {
        this.partido.id = null;
        this.partido.nombre = null;
        this.partido.siglas = null;
        this.partido.logo_URL = null;
        this.partido.independiente = false;
        this.partido.prioridad = null;
        this.partido.pantone_Fondo = null;
        this.partido.pantone_Letra = null;
        this.partido.is_Coalicion = false;
        this.partido.coalicion_Id = null;
        this.partido.coalicion = null;
        this.partido.is_Comun = false;
        this.partido.orden_Publicacion = null;
      },

      //----------------------------------------------------------------------
      //GEL INTEGRACION COMUN
      async loadComun(partido_Padre_Id) {
        try {
          let resp = await api.get(
            `/Partidos_Politicos/IsComunIntegracion/${partido_Padre_Id}`
          );
          let { data } = resp.data;
          this.list_Partidos_Comun = data.map((partido) => {
            return {
              id: partido.id,
              partido_Padre_Id: partido.partido_Padre_Id,
              partido_Id: partido.partido_Id,
              partido: partido.partido,
              porcentaje: partido.porcentaje,
              activo: partido.activo,
            };
          });
        } catch (error) {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      },

      //----------------------------------------------------------------------
      //GEL ALL
      async loadPartidosPoliticos() {
        try {
          let resp = await api.get("/Partidos_Politicos/PartidosRP");
          let { data } = resp.data;
          let listPartidosPoliticos = data.map((partido) => {
            return {
              value: partido.id,
              label: `${partido.siglas}-${partido.nombre}`,
              id: partido.id,
              nombre: partido.nombre,
              siglas: partido.siglas,
              logo_URL: partido.logo_URL,
              independiente: partido.independiente,
              prioridad: partido.prioridad,
              pantone_Fondo: partido.pantone_Fondo,
              pantone_Letra: partido.pantona_Letra,
              is_Comun: partido.is_Comun,
              orden_Publicacion: partido.orden_Publicacion,
              comun_Padre: partido.comun_Padre,
            };
          });
          this.list_Partidos_Politicos = listPartidosPoliticos.sort(
            (a, b) => a.prioridad - b.prioridad
          );
        } catch (error) {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      },

      //----------------------------------------------------------------------
      //GET PARTIDOS POLITICOS
      async loadPartdio(id) {
        try {
          let resp = null;
          resp = await api.get(`/Partidos_Politicos/${id}`);
          if (resp.status == 200) {
            const { success, data } = resp.data;
            if (success == true) {
              this.partido.id = data.id;
              this.partido.nombre = data.nombre;
              this.partido.siglas = data.siglas;
              this.partido.logo_URL = data.logo_URL;
              this.partido.independiente = data.independiente;
              this.partido.prioridad = data.prioridad;
              this.partido.pantone_Letra = data.pantona_Letra;
              this.partido.pantone_Fondo = data.pantone_Fondo;
              this.partido.is_Comun = data.is_Comun;
              this.partido.orden_Publicacion = data.orden_Publicacion;
            }
          }
        } catch (error) {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      },

      //----------------------------------------------------------------------
      //CREATE PARTIDO
      async createPartidoPolitico(partido) {
        try {
          const resp = await api.post("/Partidos_Politicos", partido, {
            headers: {
              "Conten-Type": "multipart/form-data",
            },
          });
          if (resp.status == 200) {
            const { success, data } = resp.data;
            if (success === true) {
              return { success, data };
            } else {
              return { success, data };
            }
          } else {
            return {
              success: false,
              data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
            };
          }
        } catch (error) {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      },

      //----------------------------------------------------------------------
      //CREATE COMUN
      async createIntegracionComun(partido_Padre_Id, comun) {
        try {
          const resp = await api.post(
            `/Candidatura_Comun/${partido_Padre_Id}`,
            comun
          );
          if (resp.status == 200) {
            const { success, data } = resp.data;
            if (success === true) {
              return { success, data };
            } else {
              return { success, data };
            }
          } else {
            return {
              success: false,
              data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
            };
          }
        } catch (error) {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      },

      //----------------------------------------------------------------------
      //UPDATE PARTIDO
      async updatePartdio(id, partido) {
        try {
          const resp = await api.put(`/Partidos_Politicos/${id}`, partido);
          if (resp.status == 200) {
            const { success, data } = resp.data;
            if (success === true) {
              return { success, data };
            } else {
              return { success, data };
            }
          } else {
            return {
              success: false,
              data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
            };
          }
        } catch (error) {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      },

      //----------------------------------------------------------------------
      //DELETE PARTIDO
      async deletePartido(id) {
        try {
          const resp = await api.delete(`/Partidos_Politicos/${id}`);
          if (resp.status == 200) {
            let { success, data } = resp.data;
            if (success === true) {
              return { success, data };
            } else {
              return { success, data };
            }
          } else {
            return {
              success: false,
              data: "Ocurrio un error, intentelo de nuevo",
            };
          }
        } catch (error) {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      },

      //----------------------------------------------------------------------
      //DELETE PARTIDO COMUN
      async deletePartidoComun(id) {
        try {
          const resp = await api.delete(`/Candidatura_Comun/${id}`);
          if (resp.status == 200) {
            let { success, data } = resp.data;
            if (success === true) {
              return { success, data };
            } else {
              return { success, data };
            }
          } else {
            return {
              success: false,
              data: "Ocurrio un error, intentelo de nuevo",
            };
          }
        } catch (error) {
          return {
            success: false,
            data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
          };
        }
      },
      //----------------------------------------------------------------------
      actualizarModal(valor) {
        this.modal = valor;
      },

      actualizarModalIntegracion(valor) {
        this.modalIntegracion = valor;
      },

      updateEditar(valor) {
        this.isEditar = valor;
      },
    },
  }
);
