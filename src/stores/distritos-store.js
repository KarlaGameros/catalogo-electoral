import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useDistritosStore = defineStore("useDistritosStore", {
  state: () => ({
    modal: false,
    isEditar: false,
    list_Distritos: [],
    distrito: {
      id: null,
      no_Distrito: null,
      nombre: null,
      integracion: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //GET ALL
    async loadDistritos() {
      try {
        let resp = await api.get("/Distritos");
        let { data } = resp.data;
        let listDistritos = data.map((distrito) => {
          return {
            id: distrito.id,
            no_Distrito: distrito.no_Distrito,
            nombre: distrito.nombre,
            integracion: distrito.integracion,
            label: `${distrito.no_Distrito} - ${distrito.nombre}`,
          };
        });
        this.list_Distritos = listDistritos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET DISTRITO
    async loadDistrito(id) {
      try {
        let resp = null;
        resp = await api.get(`/Distritos/By_Distritos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.distrito.id = data.id;
            this.distrito.no_Distrito = data.no_Distrito;
            this.distrito.nombre = data.nombre;
            this.distrito.integracion = data.integracion;
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
    //CREATE DISTRITO
    async createDistrito(distrito) {
      try {
        const resp = await api.post("/Distritos", distrito);
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
    //DELETE DISTRITO
    async deleteDistrito(id) {
      try {
        const resp = await api.delete(`/Distritos/${id}`);
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
    //UPDATE DISTRITO
    async updateDistrito(distrito) {
      try {
        const resp = await api.put(`/Distritos/${distrito.id}`, distrito);
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
