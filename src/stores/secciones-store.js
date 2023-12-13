import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSeccionesStore = defineStore("useSeccionesStore", {
  state: () => ({
    modal: false,
    isEditar: false,
    list_Secciones: [],
    seccion: {
      id: null,
      distrito_Id: null,
      municipio_Id: null,
      demarcacion_Id: null,
      nombre: null,
      cabecera_Localidad: null,
      padron_Electoral: null,
      listado_Nominal: null,
      tipo_Seccion: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //INIT SECCION
    initSeccion() {
      this.seccion.id = null;
      this.seccion.distrito_Id = null;
      this.seccion.municipio_Id = null;
      this.seccion.demarcacion_Id = null;
      this.seccion.nombre = null;
      this.seccion.cabecera_Localidad = null;
      this.seccion.padron_Electoral = null;
      this.seccion.listado_Nominal = null;
      this.seccion.tipo_Seccion = null;
    },

    //----------------------------------------------------------------------
    //GET ALL
    async loadSecciones() {
      try {
        let resp = await api.get("/Secciones");
        let { data } = resp.data;
        let listSecciones = data.map((casilla) => {
          return {
            id: casilla.id,
            distrito_Id: casilla.distrito_Id,
            distrito: casilla.distrito,
            municipio_Id: casilla.municipio_Id,
            municipio: casilla.municipio,
            demarcacion_Id: casilla.demarcacion_Id,
            demarcacion: casilla.demarcacion,
            nombre: casilla.nombre,
            cabecera_Localidad: casilla.cabecera_Localidad,
            padron_Electoral: casilla.padron_Electoral,
            listado_Nominal: casilla.listado_Nominal,
            tipo_Seccion: casilla.tipo_Seccion,
            value: casilla.id,
            label: casilla.nombre,
          };
        });
        this.list_Secciones = listSecciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET SECCION
    async loadSeccion(id) {
      try {
        let resp = null;
        resp = await api.get(`/Secciones/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.seccion.id = data.id;
            this.seccion.distrito_Id = data.distrito_Id;
            this.seccion.municipio_Id = data.municipio_Id;
            this.seccion.demarcacion_Id = data.demarcacion_Id;
            this.seccion.nombre = data.nombre;
            this.seccion.cabecera_Localidad = data.cabecera_Localidad;
            this.seccion.padron_Electoral = data.padron_Electoral;
            this.seccion.listado_Nominal = data.listado_Nominal;
            this.seccion.tipo_Seccion = data.tipo_Seccion;
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
    //CREATE SECCION
    async createSeccion(seccion) {
      try {
        const resp = await api.post("/Secciones", seccion);
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
    //DELETE SECCION
    async deleteCasilla(id) {
      try {
        const resp = await api.delete(`/Secciones/${id}`);
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
    //UPDATE SECCION
    async updateSeccion(seccion) {
      try {
        const resp = await api.put(`/Secciones/${seccion.id}`, seccion);
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
