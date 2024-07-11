import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useModelosStore = defineStore("useModelosStore", {
  state: () => ({
    modal: false,
    isEditar: false,
    loading: false,
    list_Modelos: [],
    modelo: {
      id: null,
      tipo_Eleccion_Id: null,
      distrito_Id: null,
      municipio_Id: null,
      demarcacion_Id: null,
      estatal: false,
      ruta: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //INIT DISTRITO
    initModelo() {
      this.modelo.id = null;
      this.modelo.tipo_Eleccion_Id = null;
      this.modelo.distrito_Id = null;
      this.modelo.demarcacion_Id = null;
      this.modelo.estatal = null;
      this.modelo.municipio_Id = null;
      this.modelo.ruta = null;
    },

    //----------------------------------------------------------------------
    //GET ALL
    async loadModelos(id) {
      try {
        this.loading = true;
        let resp = await api.get(`/ModelosActas/ByTipoEleccion/${id}`);
        let { data } = resp.data;
        this.list_Modelos = data.map((modelo) => {
          return {
            id: modelo.id,
            tipo_Eleccion_Id: modelo.tipo_Eleccion_Id,
            tipo_Eleccion: modelo.tipo_Eleccion,
            municipio_Id: modelo.municipio_Id,
            municipio: modelo.municipio,
            distrito_Id: modelo.distrito_Id,
            distrito: modelo.distrito,
            demarcacion_Id: modelo.demarcacion_Id,
            demarcacion: modelo.demarcacion,
            estatal: modelo.estatal,
            ruta: modelo.ruta,
          };
        });
        this.loading = false;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET DISTRITO
    async loadModelo(id) {
      try {
        let resp = null;
        resp = await api.get(`/ModelosActas/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.modelo.id = data.id;
            this.modelo.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
            this.modelo.demarcacion_Id = data.demarcacion_Id;
            this.modelo.estatal = data.estatal;
            this.modelo.ruta = data.ruta;
            this.modelo.distrito_Id = data.distrito_Id;
            this.modelo.municipio_Id = data.municipio_Id;
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
    async createModelo(modelo) {
      try {
        const resp = await api.post("/ModelosActas", modelo);
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
    async updateModelo(modelo) {
      try {
        const resp = await api.put(`/ModelosActas/${modelo.id}`, modelo);
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
