import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useVotoAnticipado = defineStore("useVotoAnticipado", {
  state: () => ({
    modal: false,
    isEditar: false,
    list_Voto_Anticipado: [],
    voto_Anticipado: {
      id: null,
      tipo_Eleccion_Id: null,
      distrito_Id: null,
      municipio_Id: null,
      demarcacion_Id: null,
      listado_Nominal: null,
    },
  }),
  actions: {
    initVotoAnticipado() {
      this.voto_Anticipado.id = null;
      this.voto_Anticipado.tipo_Eleccion_Id = null;
      this.voto_Anticipado.distrito_Id = null;
      this.voto_Anticipado.municipio_Id = null;
      this.voto_Anticipado.demarcacion_Id = null;
      this.voto_Anticipado.listado_Nominal = null;
    },

    //----------------------------------------------------------------------
    //GET ALL
    async loadVotoAnticipado() {
      try {
        let resp = await api.get("/VotosAnticipados");
        let { data } = resp.data;
        this.list_Voto_Anticipado = data.map((voto) => {
          return {
            id: voto.id,
            usuario: voto.usuario,
            tipo_Eleccion_Id: voto.tipo_Eleccion_Id,
            tipo_Eleccion: voto.tipo_Eleccion,
            distrito_Id: voto.distrito_Id,
            distrito: voto.distrito,
            municipio_Id: voto.municipio_Id,
            municipio: voto.municipio,
            demarcacion_Id: voto.demarcacion_Id,
            demarcacion: voto.demarcacion,
            listado_Nominal: voto.listado_Nominal,
          };
        });
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //CREATE DISTRITO
    async createVotoAnticipado(voto) {
      try {
        const resp = await api.post("/VotosAnticipados", voto);
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
    //GET VOTO ANTICIPADO
    async loadVoto(id) {
      try {
        let resp = null;
        resp = await api.get(`/VotosAnticipados/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.voto_Anticipado.id = data.id;
            this.voto_Anticipado.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
            this.voto_Anticipado.distrito_Id = data.distrito_Id;
            this.voto_Anticipado.municipio_Id = data.municipio_Id;
            this.voto_Anticipado.demarcacion_Id = data.demarcacion_Id;
            this.voto_Anticipado.listado_Nominal = data.listado_Nominal;
            this.voto_Anticipado.computado = data.computado;
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
    //UPDATE VOTO ANTICIPADO
    async updateVotoAnticipado(voto) {
      try {
        const resp = await api.put(`/VotosAnticipados/${voto.id}`, voto);
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
