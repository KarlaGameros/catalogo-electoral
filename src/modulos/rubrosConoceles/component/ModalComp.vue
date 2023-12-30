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
              lazy-rules
              :rules="[(val) => !!val || 'La variable es requerida']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="tipo"
              label="Tipo"
              hint="Ingrese tipo de la variable"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El tipo es requerido']"
            >
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              v-model.trim="descripcion"
              type="textarea"
              label="Descripción"
              hint="Ingrese la descripción"
              lazy-rules
              :rules="[(val) => !!val || 'La descripción es requerida']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="cumple"
              type="number"
              label="Cumple"
              hint="Ingrese los puntos para cumple"
              lazy-rules
              :rules="[(val) => !!val || 'Los puntos son requeridos']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="no_Cumple"
              type="number"
              label="No cumple"
              hint="Ingrese los puntos para no cumple"
              lazy-rules
              :rules="[(val) => !!val || 'Los puntos son requeridos']"
            >
            </q-input>
          </div>

          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                color="secondary"
                icon="add"
                label="Agregar"
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
const { modalRubros, rubro, isEditar, variable } = storeToRefs(conocelesStore);
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

const actualizarModal = (valor) => {
  $q.loading.show();
  conocelesStore.actualizarModalRubro(valor);
  conocelesStore.initRubro();
  $q.loading.hide();
};

const agregarVariable = async () => {
  $q.loading.show();
  conocelesStore.addVariable(
    variableEvaluar.value,
    tipo.value,
    descripcion.value,
    cumple.value,
    no_Cumple.value
  );
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
