<template>
  <q-dialog
    v-model="modalRubros"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Rurbos de evaluación</div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section>
        <q-form class="row q-col-gutter-xs" @submit="onSubmit">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="rubro.rubro"
              label="Rubro"
              hint="Ingrese nombre del rubro"
              lazy-rules
              :rules="[(val) => !!val || 'El rubro es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="rubro.puntuacion_Maxima"
              type="number"
              label="Puntuación maxima"
              hint="Ingrese puntuación maxima"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'La puntuación maxima es requerida']"
            >
            </q-input>
          </div>

          <div class="col-12 text-body1 text-bold text-pink-5 q-pt-md">
            Variables a evaluar
          </div>

          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="variableEvaluar"
              label="Variable"
              hint="Ingrese variable"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="tipo"
              label="Tipo"
              hint="Ingrese tipo de la variable"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              v-model.trim="descripcion"
              type="textarea"
              label="Descripción"
              hint="Ingrese la descripción"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="cumple"
              type="number"
              label="Cumple"
              hint="Ingrese los puntos para cumple"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="no_Cumple"
              type="number"
              label="No cumple"
              hint="Ingrese los puntos para no cumple"
            >
            </q-input>
          </div>

          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                color="secondary"
                :icon="variable.id != null ? 'edit' : 'add'"
                :label="variable.id != null ? 'Editar' : 'Agregar'"
                @click="agregarVariable()"
              />
            </div>
          </div>
          <div class="col-12">
            <TablaVariables />
          </div>
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="red"
                @click="actualizarModal(false)"
              />
              <q-btn
                :disable="isEditar"
                label="Guardar"
                type="submit"
                color="secondary"
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useConocelesStore } from "src/stores/conoceles-store";
import TablaVariables from "./TablaVariables.vue";
import { ref, watch } from "vue";

//-----------------------------------------------------------

const $q = useQuasar();
const conocelesStore = useConocelesStore();
const { modalRubros, rubro, isEditar, variable, isEditarVariable } =
  storeToRefs(conocelesStore);
const variableEvaluar = ref(null);
const descripcion = ref(null);
const tipo = ref(null);
const cumple = ref(null);
const no_Cumple = ref(null);

//-----------------------------------------------------------

watch(variable.value, (val) => {
  if (val != null) {
    variableEvaluar.value = val.variable;
    descripcion.value = val.descripcion;
    tipo.value = val.tipo;
    cumple.value = val.cumple;
    no_Cumple.value = val.no_Cumple;
  }
});

const limpiar = () => {
  variableEvaluar.value = null;
  descripcion.value = null;
  tipo.value = null;
  cumple.value = null;
  no_Cumple.value = null;
};

const actualizarModal = (valor) => {
  $q.loading.show();
  conocelesStore.actualizarModalRubro(valor);
  conocelesStore.updateEditar(false);
  conocelesStore.initRubro();
  limpiar();
  $q.loading.hide();
};

const agregarVariable = async () => {
  $q.loading.show();
  if (
    variableEvaluar.value == null ||
    tipo.value == null ||
    descripcion.value == null ||
    cumple.value == null ||
    no_Cumple.value == null
  ) {
    $q.dialog({
      title: "Atención",
      message: "Campos incompletos",
      icon: "Warning",
      persistent: true,
      transitionShow: "scale",
      transitionHide: "scale",
    });
  } else {
    if (variable.value.id != null) {
      if (isEditarVariable.value == true) {
        conocelesStore.updateVariable(variable.value);
      } else {
        conocelesStore.createVariable(rubro.value.id, variable.value);
      }
    } else {
      variable.value.variable = variableEvaluar.value;
      variable.value.tipo = tipo.value;
      variable.value.descripcion = descripcion.value;
      variable.value.cumple = cumple.value;
      variable.value.no_Cumple = no_Cumple.value;
      if (rubro.value.id != null) {
        conocelesStore.createVariable(rubro.value.id, variable.value);
      }
      await conocelesStore.addVariable(
        variableEvaluar.value,
        tipo.value,
        descripcion.value,
        cumple.value,
        no_Cumple.value
      );
      conocelesStore.initVariable();
      limpiar();
    }
  }

  $q.loading.hide();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
  } else {
    resp = await conocelesStore.createRubro(rubro.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    actualizarModal(false);
    conocelesStore.initRubro();
    conocelesStore.loadRubrosEvaluacion();
  } else {
    $q.notify({
      position: "top-right",
      type: "negative",
      message: resp.data,
    });
  }
  $q.loading.hide();
};
</script>

<style></style>
