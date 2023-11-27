import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useMunicipiosStore = defineStore("useMunicipiosStore", {
  state: () => ({
    modal: false,
    isEditar: false,
    list_Municipios: [],
    list_Estados: [],
    municipio: {
      id: null,
      estado_Id: null,
      estado: null,
      clave: null,
      nombre: null,
      fecha_Registro: null,
    },
  }),
  actions: {
    //----------------------------------------------------------------------
    //GEL LIST ESTADOS
    async loadEstados() {
      try {
        let resp = await api.get("/Estados/GetLista");
        let { data } = resp.data;

        let listEstado = data.map((estado) => {
          return {
            value: estado.value,
            label: estado.label,
          };
        });
        this.list_Estados = listEstado;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GEL ALL
    async loadMunicipios() {
      try {
        let resp = await api.get("/Municipios");
        let { data } = resp.data;

        let listNayarit = [];
        listNayarit = data.filter((x) => x.estado_Id == 18);
        let listMunicipios = listNayarit.map((municipio) => {
          return {
            id: municipio.id,
            estado_Id: municipio.estado_Id,
            estado: municipio.estado,
            clave: municipio.clave,
            nombre: municipio.nombre,
            fecha_Registro: municipio.fecha_Registro,
            value: municipio.id,
            label: municipio.nombre,
          };
        });
        this.list_Municipios = listMunicipios;
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
