import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useDemarcacionesStore = defineStore("useDemarcacionesStore", {
  state: () => ({
    modal: false,
    isEditar: false,
    list_Demarcaciones: [],
    demarcacion: {
      id: null,
      municipio_Id: null,
      municipio: null,
      nombre: null,
      no_Demarcacion: null,
      indigena: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //GET ALL
    async loadDemarcaciones() {
      try {
        let resp = await api.get("/Demarcaciones");
        let { data } = resp.data;
        let listDemarcaciones = data.map((demarcacion) => {
          return {
            id: demarcacion.id,
            municipio_Id: demarcacion.no_Distrito,
            municipio: demarcacion.municipio,
            nombre: demarcacion.nombre,
            no_Demarcacion: demarcacion.no_Demarcacion,
            indigena: demarcacion.indigena,
          };
        });
        this.list_Demarcaciones = listDemarcaciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET DEMARCACION
    async loadDemarcacion(id) {
      try {
        let resp = null;
        resp = await api.get(`/Demarcaciones/By_Demarcaciones/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.demarcacion.id = data.id;
            this.demarcacion.municipio_Id = data.municipio_Id;
            this.demarcacion.municipio = data.municipio;
            this.demarcacion.nombre = data.nombre;
            this.demarcacion.no_Demarcacion = data.no_Demarcacion;
            this.demarcacion.indigena = data.indigena;
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
    //CREATE DEMARCACION
    async createDemarcacion(demarcacion) {
      try {
        const resp = await api.post("/Demarcaciones", demarcacion);
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
    //UPDATE DEMARCACION
    async updateDemarcacion(demarcacion) {
      try {
        const resp = await api.put(
          `/Demarcaciones/${demarcacion.id}`,
          demarcacion
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
    //DELETE DEMARCACION
    async deleteDemarcacion(id) {
      try {
        const resp = await api.delete(`/Demarcaciones/${id}`);
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
