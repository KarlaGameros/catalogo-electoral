import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCoalicionesStore = defineStore("useCoalicionesStore", {
  state: () => ({
    modal: false,
    isEditar: false,
    list_Coaliciones: [],
    coalicion: {
      id: null,
      nombre: null,
      siglas: null,
      logo_URL: null,
      orden: null,
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
    actualizarModal(valor) {
      this.modal = valor;
    },

    updateEditar(valor) {
      this.isEditar = valor;
    },
  },
});
