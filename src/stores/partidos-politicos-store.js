import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePartidosPoliticosStore = defineStore(
  "usePartidosPoliticosStore",
  {
    state: () => ({
      modal: false,
      isEditar: false,
      list_Partidos_Politicos: [],
      partido: {
        id: null,
        nombre: null,
        siglas: null,
        logo_URL: null,
        independiente: false,
        prioridad: null,
        pantone_Letra: null,
        pantone_Fondo: null,
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
      },

      //----------------------------------------------------------------------
      //GEL ALL
      async loadPartidosPoliticos() {
        try {
          let resp = await api.get("/Partidos_Politicos");
          let { data } = resp.data;
          let listPartidosPoliticos = data.map((partido) => {
            return {
              id: partido.id,
              nombre: partido.nombre,
              siglas: partido.siglas,
              logo_URL: partido.logo_URL,
              independiente: partido.independiente,
              prioridad: partido.prioridad,
              pantone_Fondo: partido.pantone_Fondo,
              pantone_Letra: partido.pantona_Letra,
            };
          });
          this.list_Partidos_Politicos = listPartidosPoliticos;
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
      actualizarModal(valor) {
        this.modal = valor;
      },

      updateEditar(valor) {
        this.isEditar = valor;
      },
    },
  }
);
