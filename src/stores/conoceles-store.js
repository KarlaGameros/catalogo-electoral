import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useConocelesStore = defineStore("useConocelesStore", {
  state: () => ({
    modal: false,
    modalRubros: false,
    isEditar: false,
    list_Preguntas_Identidad: [],
    list_Respuestas: [],
    list_Rubros_Evaluacion: [],
    pregunta: {
      numero: null,
      pregunta: null,
      tipo: null,
      apartado: null,
      opciones: [],
    },
    opciones: [],
    rubro: {
      id: null,
      rubro: null,
      puntuacion_Maxima: null,
      variables: [
        {
          variable: null,
          tipo: null,
          descripcion: null,
          cumple: null,
          no_Cumple: null,
        },
      ],
    },
    variable: {
      variable: null,
      tipo: null,
      descripcion: null,
      cumple: null,
      no_Cumple: null,
    },
  }),
  actions: {
    initPregunta() {
      this.pregunta.id = null;
      this.pregunta.numero = null;
      this.pregunta.tipo = null;
      this.pregunta.apartado = null;
      this.pregunta.pregunta = null;
      this.pregunta.opciones = [];
    },

    initRubro() {
      this.rubro.variables = [];
    },
    //----------------------------------------------------------------------
    //GET ALL PREGUNTAS
    async loadPreguntasIdentidad() {
      try {
        let resp = await api.get("/PreguntasCandidatos");
        let { data } = resp.data;
        let listPreguntas = data.map((item) => {
          return {
            id: item.id,
            numero: item.numero,
            pregunta: item.pregunta,
            tipo: item.tipo,
            apartado: item.apartado,
          };
        });
        this.list_Preguntas_Identidad = listPreguntas;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async addOpcion(opcion, otro) {
      try {
        this.pregunta.opciones.push({
          opcion: opcion,
          otro: otro,
        });
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET PREGUNTA
    async loadPregunta(id) {
      try {
        let resp = null;
        resp = await api.get(`/PreguntasCandidatos/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.pregunta.id = data.id;
            this.pregunta.numero = data.numero;
            this.pregunta.pregunta = data.pregunta;
            this.pregunta.tipo = data.tipo;
            this.pregunta.apartado = data.apartado;
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
    //CREATE PREGUNTA
    async createPregunta(pregunta) {
      try {
        const resp = await api.post("/PreguntasCandidatos", pregunta);
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
    //DELETE PREGUNTA
    async deletePregunta(id) {
      try {
        const resp = await api.delete(`/PreguntasCandidatos/${id}`);
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
    //UPDATE PREGUNTA
    async updatePregunta(id, pregunta) {
      try {
        const resp = await api.put(`/PreguntasCandidatos/${id}`, pregunta);
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
    //GET RESPUESTAS
    async loadRespuestas(id) {
      try {
        let resp = await api.get(`/OpcionesPreguntas/ByPregunta/${id}`);
        let { data } = resp.data;
        let listRespuestas = data.map((item) => {
          return {
            id: item.id,
            opcion: item.opcion,
            otro: item.otro,
          };
        });
        this.pregunta.opciones = listRespuestas;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //GET RESPUESTA
    async loadOpcion(id) {
      try {
        let resp = null;
        resp = await api.get(`/OpcionesPreguntas/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.opcion.id = data.id;
            this.opcion.pregunta_Id = data.pregunta_Id;
            this.opcion.opcion = data.opcion;
            this.opcion.otro = data.otro;
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
    //GET ALL RUBROS
    async loadRubrosEvaluacion() {
      try {
        let resp = await api.get("/RubrosEvaluacion");
        let { data } = resp.data;
        this.list_Rubros_Evaluacion = data.map((rubro) => {
          return {
            id: rubro.id,
            rubro: rubro.rubro,
            puntuacion_Maxima: rubro.puntuacion_Maxima,
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
    //GET ALL VARIABLES BY RUBRO
    async loadVariablesByRubro(id) {
      try {
        let resp = await api.get(`/VariablesEvaluacion/ByRubro/${id}`);
        let { data } = resp.data;
        this.rubro.variables = data.map((variable) => {
          return {
            id: variable.id,
            variable: variable.variable,
            tipo: variable.tipo,
            descripcion: variable.descripcion,
            cumple: variable.cumple,
            no_Cumple: variable.no_Cumple,
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
    //GET VARIABLE A EVALUAR
    async loadVariableById(id) {
      try {
        let resp = null;
        resp = await api.get(`/VariablesEvaluacion/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.variable.id = data.id;
            this.variable.variable = data.variable;
            this.variable.tipo = data.tipo;
            this.variable.descripcion = data.descripcion;
            this.variable.cumple = data.cumple;
            this.variable.no_Cumple = data.no_Cumple;
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
    //CREATE RUBRO EVALUACION
    async createRubro(rubro) {
      try {
        const resp = await api.post("/RubrosEvaluacion", rubro);
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
    //GET RUBRO
    async loadRubroEvaluacion(id) {
      try {
        let resp = null;
        resp = await api.get(`/RubrosEvaluacion/${id}`);
        if (resp.status == 200) {
          const { success, data } = resp.data;
          if (success == true) {
            this.rubro.id = data.id;
            this.rubro.puntuacion_Maxima = data.puntuacion_Maxima;
            this.rubro.rubro = data.rubro;
          }
        }
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    async addVariable(variable, tipo, descripcion, cumple, no_Cumple) {
      try {
        this.rubro.variables.push({
          variable: variable,
          tipo: tipo,
          descripcion: descripcion,
          cumple: cumple,
          no_Cumple: no_Cumple,
        });
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    actualizarModal(valor) {
      this.modal = valor;
    },
    actualizarModalRubro(valor) {
      this.modalRubros = valor;
    },
    updateEditar(valor) {
      this.isEditar = valor;
    },
  },
});
