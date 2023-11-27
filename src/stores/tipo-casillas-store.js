import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useTipoCasillasStore = defineStore("useTipoCasillasStore", {
  state: () => ({
    modal: false,
    isEditar: false,
    list_Tipo_Casillas: [],
    casilla: {
      id: null,
      nombre: null,
      siglas: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //GET ALL
    async loadTipoCasillas() {
      try {
        let resp = await api.get("/Tipos_Casillas");
        let { data } = resp.data;
        let listTipoCasillas = data.map((casilla) => {
          return {
            id: casilla.id,
            nombre: casilla.nombre,
            siglas: casilla.siglas,
          };
        });
        this.list_Tipo_Casillas = listTipoCasillas;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET CASILLA
    async loadCasilla(id) {
      try {
        let resp = null;
        resp = await api.get(`/Tipos_Casillas/By_Tipo_Casilla/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.casilla.id = data.id;
            this.casilla.siglas = data.siglas;
            this.casilla.nombre = data.nombre;
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
    //CREATE CASILLA
    async createCasilla(casilla) {
      try {
        const resp = await api.post("/Tipos_Casillas", casilla);
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
    //DELETE CASILLA
    async deleteCasilla(id) {
      try {
        const resp = await api.delete(`/Tipos_Casillas/${id}`);
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
    //UPDATE CASILLA
    async updateCasilla(casilla) {
      try {
        const resp = await api.put(`/Distritos/${casilla.id}`, casilla);
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
    actualizarModal(valor) {
      this.modal = valor;
    },

    updateEditar(valor) {
      this.isEditar = valor;
    },
  },
});
