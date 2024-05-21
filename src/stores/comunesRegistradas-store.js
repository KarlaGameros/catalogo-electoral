import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useComunesRegistradasStore = defineStore(
  "useComunesRegistradasStore",
  {
    state: () => ({
      isEditar: false,
      modal: false,
      comunRegistrada: {
        tipo_Eleccion_Id: null,
        eleccion: null,
        distrito_Id: null,
        municipio_Id: null,
        municipio: null,
        demarcacion_Id: null,
        demarcacion: null,
        voto_Valido_Comun_RP: false,
      },
      list_Comunes_Registradas: [],
    }),
    actions: {
      actualizarModal(valor) {
        this.modal = valor;
      },

      updateEditar(valor) {
        this.isEditar = valor;
      },

      initComun() {
        this.comunRegistrada.tipo_Eleccion_Id = null;
        this.comunRegistrada.distrito_Id = null;
        this.comunRegistrada.municipio_Id = null;
        this.comunRegistrada.municipio = null;
        this.comunRegistrada.demarcacion_Id = null;
        this.comunRegistrada.demarcacion = null;
        this.comunRegistrada.voto_Valido_Comun_RP = null;
      },

      //----------------------------------------------------------------------
      //GET ALL
      async loadComunesRegistradas() {
        try {
          let resp = await api.get("/ComunesRegisturiasRP");
          let { data } = resp.data;
          this.list_Comunes_Registradas = data.map((comun) => {
            return {
              id: comun.id,
              tipo_Eleccion_Id: comun.tipo_Eleccion_Id,
              eleccion:
                comun.distrito_Id != null ? "Diputaciones" : "Regidurías",
              distrito_Id: comun.distrito_Id,
              distrito: comun.distrito_Id == null ? "N/A" : comun.distrito,
              municipio_Id: comun.municipio_Id,
              municipio: comun.municipio_Id == null ? "N/A" : comun.municipio,
              demarcacion_Id: comun.demarcacion_Id,
              demarcacion:
                comun.demarcacion_Id == null ? "N/A" : comun.demarcacion,
              voto_Valido_Comun_RP: comun.voto_Valido_Comun_RP,
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
      //GET COMUN REGSTRADA
      async loadComunRegistrada(id) {
        try {
          let resp = null;
          resp = await api.get(`/ComunesRegisturiasRP/${id}`);
          if (resp.status == 200) {
            const { success, data } = resp.data;
            if (success == true) {
              this.comunRegistrada.id = data.id;
              this.comunRegistrada.tipo_Eleccion_Id = data.tipo_Eleccion_Id;
              this.comunRegistrada.distrito_Id = data.distrito_Id;
              this.comunRegistrada.municipio_Id = data.municipio_Id;
              this.comunRegistrada.municipio = data.municipio;
              this.comunRegistrada.demarcacion_Id = data.demarcacion_Id;
              this.comunRegistrada.demarcacion = data.demarcacion;
              this.comunRegistrada.voto_Valido_Comun_RP =
                data.voto_Valido_Comun_RP;
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
      //CREATE COMUNES REGISTRADOS
      async createComunesRegistradas(comun) {
        try {
          const resp = await api.post("/ComunesRegisturiasRP", comun);
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
      //UPDATE COMUN REGISTRADA
      async updateComunRegistrada(comun) {
        try {
          const resp = await api.put(
            `/ComunesRegisturiasRP/${comun.id}`,
            comun
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
      //DELETE
      async deleteComunRP(id) {
        try {
          const resp = await api.delete(`/ComunesRegisturiasRP/${id}`);
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
    },
  }
);
