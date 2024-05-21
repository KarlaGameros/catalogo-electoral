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
      correo: null,
      contrasena: null,
      smtp: null,
      puerto: null,
      correo_RP: null,
      contrasena_RP: null,
      puerto_RP: null,
      smtp_RP: null,
      propietario_1: false,
      propietario_2: false,
      suplente_1: false,
      suplente_2: false,
    },
    list_Requisitos: [],
    requisistos: {
      id: null,
      tipo_Eleccion_Id: null,
      nombre: null,
      descripcion: null,
      archivo: false,
      genero: false,
      activo: false,
      obligatorio: false,
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
      this.eleccion.propietario_1 = false;
      this.eleccion.propietario_2 = false;
      this.eleccion.suplente_1 = false;
      this.eleccion.suplente_2 = false;
      this.eleccion.correo = null;
      this.eleccion.contrasena = null;
      this.eleccion.puerto = null;
      this.eleccion.smtp = null;
      this.eleccion.contrasena_RP = null;
      this.eleccion.contrasena_RP = null;
      this.eleccion.puerto_RP = null;
      this.eleccion.smtp_RP = null;
    },

    initRequisitos() {
      this.requisistos.id = null;
      this.requisistos.tipo_Eleccion_Id = null;
      this.requisistos.nombre = null;
      this.requisistos.descripcion = null;
      this.requisistos.archivo = false;
      this.requisistos.genero = false;
      this.requisistos.activo = false;
      this.requisistos.obligatorio = false;
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
            value: eleccion.id,
            label: eleccion.nombre,
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
            this.eleccion.propietario_1 = data.propietario_1;
            this.eleccion.propietario_2 = data.propietario_2;
            this.eleccion.suplente_1 = data.suplente_1;
            this.eleccion.suplente_2 = data.suplente_2;
            this.eleccion.correo = data.correo;
            this.eleccion.contrasena = data.contrasena;
            this.eleccion.smtp = data.smtp;
            this.eleccion.puerto = data.puerto;
            this.eleccion.correo_RP = data.correo_RP;
            this.eleccion.contrasena_RP = data.contrasena_RP;
            this.eleccion.puerto_RP = data.puerto_RP;
            this.eleccion.smtp_RP = data.smtp_RP;
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
    async createRequisitos(id, requisito) {
      try {
        const resp = await api.post(
          `/Tipos_Eleccion_Requerimientos/${id}`,
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
    //GET REQUISITOS
    async loadRequisitos(id) {
      try {
        let resp = await api.get(
          `/Tipos_Eleccion_Requerimientos/ByTipoEleccion/${id}`
        );
        let { data } = resp.data;
        let listRequisitos = data.map((requisito) => {
          return {
            id: requisito.id,
            nombre: requisito.nombre,
            descripcion: requisito.descripcion,
            genero: requisito.genero,
            activo: requisito.activo,
            archivo: requisito.archivo,
            obligatorio: requisito.obligatorio,
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
            this.requisistos.descripcion = data.descripcion;
            this.requisistos.obligatorio = data.obligatorio;
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
