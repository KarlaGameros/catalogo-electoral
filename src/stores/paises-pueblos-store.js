import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePaisesPueblosStore = defineStore("usePaisesPueblosStore", {
  state: () => ({
    modal: false,
    modalGrupo: false,
    isEditar: false,
    list_Paises: [],
    list_Grupos_Indigenas: [],
    pais: {
      id: null,
      siglas: null,
      nombre: null,
      clave: null,
      pais: null,
    },
    grupo: {
      id: null,
      grupo: null,
      clave: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //GET ALL PAISES
    async loadPaises() {
      try {
        let resp = await api.get("/Paises");
        let { data } = resp.data;
        let listPaises = data.map((pais) => {
          return {
            id: pais.id,
            pais: pais.pais,
            clave: pais.clave,
          };
        });
        this.list_Paises = listPaises;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET PAIS
    async loadPais(id) {
      try {
        let resp = null;
        resp = await api.get(`/Paises/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.pais.id = data.id;
            this.pais.nombre = data.pais;
            this.pais.siglas = data.clave;
            this.pais.clave = data.clave;
            this.pais.pais = data.pais;
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
    //CREATE PAIS
    async createPais(pais) {
      try {
        const resp = await api.post("/Paises", pais);
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
    //UPDATE PAIS
    async updatePais(pais) {
      try {
        const resp = await api.put(`/Paises/${pais.id}`, pais);
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
    //DELETE PAIS
    async deletePais(id) {
      try {
        const resp = await api.delete(`/Paises/${id}`);
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
    //GET ALL GRUPOS INDIGENAS
    async loadGrupos() {
      try {
        let resp = await api.get("/GruposIndigenas");
        let { data } = resp.data;
        let listGrupos = data.map((grupo) => {
          return {
            id: grupo.id,
            grupo: grupo.grupo,
            clave: grupo.clave,
          };
        });
        this.list_Grupos_Indigenas = listGrupos;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //CREATE GRUPO INDIGENA
    async createGrupo(grupo) {
      try {
        const resp = await api.post("/GruposIndigenas", grupo);
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
    //UPDATE GRUPO
    async updateGrupo(grupo) {
      try {
        const resp = await api.put(`/GruposIndigenas/${grupo.id}`, grupo);
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
    //GET GRUPO
    async loadGrupo(id) {
      try {
        let resp = null;
        resp = await api.get(`/GruposIndigenas/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.grupo.id = data.id;
            this.grupo.clave = data.clave;
            this.grupo.grupo = data.grupo;
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
    //DELETE GRUPO
    async deleteGrupo(id) {
      try {
        const resp = await api.delete(`/GruposIndigenas/${id}`);
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

    actualizarModalGrupo(valor) {
      this.modalGrupo = valor;
    },
  },
});
