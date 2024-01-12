import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useTipoEleccionesStore = defineStore("useTipoEleccionesStore", {
  state: () => ({
    modal: false,
    modalRequisitos: false,
    isEditar: false,
    list_Tipos_Elecciones: [],
    eleccion: {
      id: null,
      siglas: null,
      nombre: null,
      fecha_Registro: null,
      activo: false,
    },
    list_Requisitos: [],
    requisistos: {
      id: null,
      tipo_Eleccion_Id: null,
      nombre: null,
      archivo: false,
      genero: false,
      activo: false,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //INIT TIPO ELECCIONES
    initElecciones() {
      this.eleccion.id = null;
      this.eleccion.nombre = null;
      this.eleccion.siglas = null;
      this.eleccion.fecha_Registro = null;
      this.eleccion.activo = false;
    },

    initRequisitos() {
      this.requisistos.id = null;
      this.requisistos.tipo_Eleccion_Id = null;
      this.requisistos.nombre = null;
      this.requisistos.archivo = false;
      this.requisistos.genero = false;
      this.requisistos.activo = false;
    },

    //----------------------------------------------------------------------
    //GET ALL
    async loadTiposEleeciones() {
      try {
        let resp = await api.get("/Tipos_Elecciones");
        let { data } = resp.data;
        let listElecciones = data.map((eleccion) => {
          return {
            id: eleccion.id,
            siglas: eleccion.siglas,
            nombre: eleccion.nombre,
            fecha_Registro: eleccion.fecha_Registro,
            activo: eleccion.activo,
          };
        });
        this.list_Tipos_Elecciones = listElecciones;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET TIPO ELECCION
    async loadTipoEleccion(id) {
      try {
        let resp = null;
        resp = await api.get(`/Tipos_Elecciones/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.eleccion.id = data.id;
            this.eleccion.nombre = data.nombre;
            this.eleccion.siglas = data.siglas;
            this.eleccion.fecha_Registro = data.fecha_Registro;
            this.eleccion.activo = data.activo;
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
    //CREATE ELECCION
    async createEleccion(eleccion) {
      try {
        const resp = await api.post("/Tipos_Elecciones", eleccion);
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
    //DELETE ELECCION
    async deleteEleccion(id) {
      try {
        const resp = await api.delete(`/Tipos_Elecciones/${id}`);
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
    //UPDATE ELECCION
    async updateEleccion(eleccion) {
      try {
        const resp = await api.put(
          `/Tipos_Elecciones/${eleccion.id}`,
          eleccion
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
    //CREATE REQUISITOS
    async createRequisitos(requisisto) {
      try {
        const resp = await api.post(
          "/Tipos_Eleccion_Requerimientos",
          requisisto
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
    //GET REQUISITOS
    async loadRequisitos(id) {
      try {
        let resp = await api.get("/Tipos_Eleccion_Requerimientos");
        let { data } = resp.data;
        let listByEleccion = [];
        listByEleccion = data.filter((x) => x.tipo_Eleccion_Id == id);
        let listRequisitos = listByEleccion.map((requisito) => {
          return {
            id: requisito.id,
            nombre: requisito.nombre,
            genero: requisito.genero,
            activo: requisito.activo,
            archivo: requisito.archivo,
          };
        });
        this.list_Requisitos = listRequisitos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET REQUERIMIENTO
    async loadRequerimientoById(id) {
      try {
        let resp = null;
        resp = await api.get(`/Tipos_Eleccion_Requerimientos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.requisistos.id = data.id;
            this.requisistos.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
            this.requisistos.nombre = data.nombre;
            this.requisistos.archivo = data.archivo;
            this.requisistos.genero = data.genero;
            this.requisistos.activo = data.activo;
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
    //UPDATE REQUISITOS ELECCION
    async updateRequisitosEleccion(requisito) {
      try {
        const resp = await api.put(
          `/Tipos_Eleccion_Requerimientos/${requisito.id}`,
          requisito
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
    actualizarModal(valor) {
      this.modal = valor;
    },

    updateEditar(valor) {
      this.isEditar = valor;
    },

    actualizarModalRequisitos(valor) {
      this.modalRequisitos = valor;
    },
  },
});
