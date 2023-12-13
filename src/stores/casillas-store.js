import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useCasillasStore = defineStore("useCasillasStore", {
  state: () => ({
    modal: false,
    modalCasillas: false,
    isEditar: false,
    list_Tipo_Casillas: [],
    list_Casillas: [],
    tipo_casilla: {
      id: null,
      nombre: null,
      siglas: null,
    },
    casilla: {
      municipio_Id: null,
      seccion_Id: null,
      tipo_Casilla_Id: null,
      no_Casilla: null,
      extension_Contigua: null,
      listado_Nominal: null,
      padron_Electoral: null,
      boletas_Entregadas: null,
      nombre: null,
      tipo_Seccion: null,
      domicilio: null,
      referencia: null,
      tipo_Lugar: null,
      ubicacion: null,
      latitud_Cartografica: null,
      latitud_Google: null,
      longitud_Cartografica: null,
      longitud_Google: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //INIT CASILLAS
    initCasilla() {
      this.casilla.id = null;
      this.casilla.municipio_Id = null;
      this.casilla.tipo_Casilla_Id = null;
      this.casilla.extension_Contigua = null;
      this.casilla.listado_Nominal = null;
      this.casilla.padron_Electoral = null;
      this.casilla.boletas_Entregadas = null;
      this.casilla.nombre = null;
      this.casilla.tipo_Seccion = null;
      this.casilla.domicilio = null;
      this.casilla.referencia = null;
      this.casilla.tipo_Lugar = null;
      this.casilla.ubicacion = null;
      this.casilla.latitud_Cartografica = null;
      this.casilla.latitud_Google = null;
      this.casilla.longitud_Cartografica = null;
      this.casilla.longitud_Cartografica = null;
      this.casilla.no_Casilla = null;
      this.casilla.longitud_Google = null;
      this.casilla.seccion_Id = null;
    },

    //----------------------------------------------------------------------
    //GET ALL TIPO CASILLAS
    async loadTipoCasillas() {
      try {
        let resp = await api.get("/Tipos_Casillas");
        let { data } = resp.data;
        let listTipoCasillas = data.map((casilla) => {
          return {
            id: casilla.id,
            nombre: casilla.nombre,
            siglas: casilla.siglas,
            value: casilla.id,
            label: casilla.nombre,
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
    //GET TIPO CASILLA
    async loadTipoCasilla(id) {
      try {
        let resp = null;
        resp = await api.get(`/Tipos_Casillas/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.tipo_casilla.id = data.id;
            this.tipo_casilla.siglas = data.siglas;
            this.tipo_casilla.nombre = data.nombre;
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
    //CREATE TIPO CASILLA
    async createTipoCasilla(casilla) {
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
    //DELETE TIPO CASILLA
    async deleteTipoCasilla(id) {
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
    //UPDATE TIPO CASILLA
    async updateTipoCasilla(casilla) {
      try {
        const resp = await api.put(`/Tipos_Casillas/${casilla.id}`, casilla);
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
    //GET CASILLAS
    async loadCasillas() {
      try {
        let resp = await api.get("/Casillas");
        let { data } = resp.data;
        let listCasillas = data.map((casilla) => {
          return {
            id: casilla.id,
            nombre: casilla.nombre,
            municipio_Id: casilla.municipio_Id,
            municipio: casilla.municipio,
            seccion_Id: casilla.seccion_Id,
            seccion: casilla.seccion,
            tipo_Casilla_Id: casilla.tipo_Casilla_Id,
            tipo_Casilla: casilla.tipo_Casilla,
            no_Casilla: casilla.no_Casilla,
            extension_Contigua: casilla.extension_Contigua,
            listado_Nominal: casilla.listado_Nominal,
            padron_Electoral: casilla.padron_Electoral,
            boletas_Entregadas: casilla.boletas_Entregadas,
            activo: casilla.activo,
            tipo_Seccion: casilla.tipo_Seccion,
            domicilio: casilla.domicilio,
            referencia: casilla.referencia,
            tipo_Lugar: casilla.tipo_Lugar,
            ubicacion: casilla.ubicacion,
            latitud_Cartografica: casilla.latitud_Cartografica,
            latitud_Google: casilla.latitud_Google,
            longitud_Cartografica: casilla.longitud_Cartografica,
            longitud_Google: casilla.longitud_Google,
          };
        });
        this.list_Casillas = listCasillas;
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
        const resp = await api.post("/Casillas", casilla);
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
    //GET CASILLA
    async loadCasilla(id) {
      try {
        let resp = null;
        resp = await api.get(`/Casillas/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.casilla.id = data.id;
            this.casilla.nombre = data.nombre;
            this.casilla.municipio_Id = data.municipio_Id;
            this.casilla.seccion_Id = data.seccion_Id;
            this.casilla.tipo_Casilla_Id = data.tipo_Casilla_Id;
            this.casilla.no_Casilla = data.no_Casilla;
            this.casilla.extension_Contigua = data.extension_Contigua;
            this.casilla.listado_Nominal = data.listado_Nominal;
            this.casilla.padron_Electoral = data.padron_Electoral;
            this.casilla.boletas_Entregadas = data.boletas_Entregadas;
            this.casilla.activo = data.activo;
            this.casilla.tipo_Seccion = data.tipo_Seccion;
            this.casilla.domicilio = data.domicilio;
            this.casilla.referencia = data.referencia;
            this.casilla.tipo_Lugar = data.tipo_Lugar;
            this.casilla.ubicacion = data.ubicacion;
            this.casilla.latitud_Cartografica = data.latitud_Cartografica;
            this.casilla.latitud_Google = data.latitud_Google;
            this.casilla.longitud_Cartografica = data.longitud_Cartografica;
            this.casilla.longitud_Google = data.longitud_Google;
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
    //UPDATE CASILLA
    async updateCasilla(casilla) {
      try {
        const resp = await api.put(`/Casillas/${casilla.id}`, casilla);
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

    actualizarModalCasilla(valor) {
      this.modalCasillas = valor;
    },

    updateEditar(valor) {
      this.isEditar = valor;
    },
  },
});
