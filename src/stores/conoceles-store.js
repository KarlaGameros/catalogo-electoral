import { defineStore } from "pinia";
import { api, apiConoceles } from "src/boot/axios";

export const useConocelesStore = defineStore("useConocelesStore", {
  state: () => ({
    modal: false,
    modalRubros: false,
    modalSubOpcion: false,
    isEditar: false,
    isEditarVariable: false,
    list_Preguntas_Identidad: [],
    list_Respuestas: [],
    list_Rubros_Evaluacion: [],
    list_Sub_Opciones: [],
    pregunta: {
      numero: null,
      pregunta: null,
      tipo: null,
      apartado: null,
      opciones: [],
    },
    opciones: [],
    opcionPregunta: {
      opcion: null,
      otro: false,
    },
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
    subOpcion: {
      sub_Opcion: null,
      opcion_Id: null,
    },
    opcion: {
      id: null,
      pregunta_Id: null,
      opcion: null,
      otro: false,
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
      this.rubro.id = null;
      this.rubro.rubro = null;
      this.rubro.puntuacion_Maxima = null;
      this.rubro.variables = [];
    },

    initVariable() {
      this.variable.id = null;
      this.variable.variable = null;
      this.variable.tipo = null;
      this.variable.descripcion = null;
      this.variable.cumple = null;
      this.variable.no_Cumple = null;
    },

    initSubOpcion() {
      this.subOpcion.opcion_Id = null;
      this.subOpcion.sub_Opcion = null;
    },

    initOpcion() {
      this.opcion.id = null;
      this.opcion.opcion = null;
      this.opcion.otro = false;
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
            pregunta_Completa: item.pregunta,
            pregunta:
              item.pregunta.length >= 50
                ? item.pregunta.slice(0, 50) + "..."
                : item.pregunta,
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
            pregunta_Id: item.pregunta_Id,
            opcion: item.opcion,
            otro: item.otro,
            label: item.opcion,
            value: item.id,
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
    //CREATE OPCION
    async createOpcion(opcion, id) {
      try {
        const resp = await api.post(`/OpcionesPreguntas/${id}`, opcion);
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
    //UPDATE OPCION
    async updateOpcion(opcion) {
      try {
        const resp = await api.put(`/OpcionesPreguntas/${opcion.id}`, opcion);
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
    //DELETE OPCION
    async deleteOpcion(id) {
      try {
        const resp = await api.delete(`/OpcionesPreguntas/${id}`);
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
        let resp = await api.get(`/Variables_Evaluacion/ByRubro/${id}`);
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
        resp = await api.get(`/Variables_Evaluacion/${id}`);
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
    //CREATE VARIABLE
    async createVariable(id, variable) {
      try {
        const resp = await api.post(`/Variables_Evaluacion/${id}`, variable);
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
    //DELETE VARIABLE
    async deleteVariable(id) {
      try {
        const resp = await api.delete(`/Variables_Evaluacion/${id}`);
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

    //----------------------------------------------------------------------
    //UPDATE PREGUNTA
    async updateVariable(variable) {
      try {
        const resp = await api.put(
          `/Variables_Evaluacion/${variable.id}`,
          variable
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

    //----------------------------------------------------------------------
    //LIMPIAR CAHCE
    async limpiarCache() {
      try {
        let resp = await apiConoceles.get("/Tipos_Elecciones/Borrar_Cache");
        let { data, success } = resp;
        return success, data;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //NUMERO DE FORMULA
    async asignarNoFormula() {
      try {
        let resp = await api.get("/Candidatos/Asignar_No_Formula");
        let { data, success } = resp;
        return success, data;
      } catch (error) {
        return {
          success: false,
          data: "Ocurrió un error, inténtelo de nuevo. Si el error persiste, contacte a soporte",
        };
      }
    },

    //----------------------------------------------------------------------
    //CREATE SUBOPCION
    async createSubOpcion(subOpcion) {
      try {
        const resp = await api.post(
          `/SubOpcionesPreguntas/${subOpcion.opcion_Id}`,
          subOpcion
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
    //GET SUBOPCIONES
    async loadSubopcionesByOpcion(id) {
      try {
        let resp = await api.get(`/SubOpcionesPreguntas/ByOpcion/${id}`);
        let { data } = resp.data;
        let listSubOpciones = data.map((item) => {
          return {
            id: item.id,
            sub_Opcion: item.sub_Opcion,
          };
        });
        this.list_Sub_Opciones = listSubOpciones;
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
    actualizarModalSubOpcion(valor) {
      this.modalSubOpcion = valor;
    },
    updateEditar(valor) {
      this.isEditar = valor;
    },
    updateEditarVariable(valor) {
      this.isEditarVariable = valor;
    },
  },
});
