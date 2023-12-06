import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCoalicionesStore = defineStore("useCoalicionesStore", {
  state: () => ({
    modal: false,
    modalIntegracion: false,
    modalCombinaciones: false,
    isEditar: false,
    list_Coaliciones: [],
    list_Integracion: [],
    list_Combinaciones: [],
    coalicion: {
      id: null,
      nombre: null,
      siglas: null,
      logo_URL: null,
      orden: null,
    },
    integracion: {
      partido_Id: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //INIT COALICION
    initCoalicion() {
      this.coalicion.id = null;
      this.coalicion.nombre = null;
      this.coalicion.siglas = null;
      this.coalicion.logo_URL = null;
      this.coalicion.orden = null;
    },

    //----------------------------------------------------------------------
    //GET ALL
    async loadCoaliciones() {
      try {
        let resp = await api.get("/Coaliciones");
        let { data } = resp.data;
        let listCoaliciones = data.map((coalicion) => {
          return {
            id: coalicion.id,
            nombre: coalicion.nombre,
            siglas: coalicion.siglas,
            logo_URL: coalicion.logo_URL,
            orden: coalicion.orden,
            activo: coalicion.activo,
          };
        });
        this.list_Coaliciones = listCoaliciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //LOAD COALICION
    async loadCoalicion(id) {
      try {
        let resp = null;
        resp = await api.get(`/Coaliciones/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.coalicion.id = data.id;
            this.coalicion.nombre = data.nombre;
            this.coalicion.siglas = data.siglas;
            this.coalicion.logo_URL = data.logo_URL;
            this.coalicion.orden = data.orden;
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
    //CREATE COALICION
    async createCoalicion(coalicion) {
      try {
        const resp = await api.post("/Coaliciones", coalicion, {
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
    //UPDATE COALICION
    async updateCoalicion(id, coalicion) {
      try {
        const resp = await api.put(`/Coaliciones/${id}`, coalicion);
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
    //DELETE COALICION
    async deleteCoalicion(id) {
      try {
        const resp = await api.delete(`/Coaliciones/${id}`);
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
    //CREATE INTEGRACION
    async createIntegracion(id, integracion) {
      try {
        const resp = await api.post(
          `/Integracion_Coaliciones/${id}`,
          integracion
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
    //GET INTEGRACIONES BY CALICION
    async loadIntegracionesByCoalicion(id) {
      try {
        let resp = await api.get(`/Integracion_Coaliciones/ByCoalicion/${id}`);
        let { data } = resp.data;
        let listIntegracion = data.map((partido) => {
          return {
            id: partido.id,
            coalicion_Id: partido.coalicion_Id,
            coalicion: partido.coalicion,
            partido: partido.partido,
          };
        });
        this.list_Integracion = listIntegracion;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },
    async deleteIntegracion(id) {
      try {
        const resp = await api.delete(`/Integracion_Coaliciones/${id}`);
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
    //GET COMBINACIONES
    async getCombinaciones(id) {
      try {
        let resp = await api.get(`/Coaliciones/GetCombinaciones/${id}`);
        let { data } = resp.data;

        if (data.length == 0) {
          return false;
        } else {
          let listCombinacion = data.map((combinacion) => {
            return {
              id: combinacion.id,
              coalicion_Id: combinacion.coalicion_Id,
              combinacion: combinacion.combinacion,
              logo_Url: combinacion.partido,
            };
          });
          this.list_Combinaciones = listCombinacion;
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GENERAR COMBINACIONES
    async generarCombinaciones(id) {
      try {
        const resp = await api.get(`/Coaliciones/GenerarCombinaciones/${id}`);
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

    actualizarModalCombinaciones(valor) {
      this.modalCombinaciones = valor;
    },

    updateEditar(valor) {
      this.isEditar = valor;
    },
  },
});
