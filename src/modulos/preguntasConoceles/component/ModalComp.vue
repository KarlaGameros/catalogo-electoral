<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          {{ isEditar ? "Editar pregunta" : "Registrar pregunta" }}
        </div>
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
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <q-input
              v-if="!isEditar"
              readonly
              v-model="numero"
              type="number"
              label="Número"
              hint="Ingrese número de la pregunta"
              lazy-rules
              :rules="[(val) => !!val || 'El número es requerido']"
            >
            </q-input>
            <q-input
              v-else
              v-model="pregunta.numero"
              type="number"
              label="Número"
              hint="Ingrese número de la pregunta"
              lazy-rules
              :rules="[(val) => !!val || 'El número es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <q-input
              v-model.trim="pregunta.tipo"
              label="Tipo"
              hint="Ingrese tipo de la pregunta"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El tipo es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <q-input
              v-model.trim="pregunta.apartado"
              label="Apartado"
              hint="Ingrese apartado de la pregunta"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El apartado es requerido']"
            >
            </q-input>
          </div>
          <div class="col-12 q-pt-md">
            <q-input
              v-model.trim="pregunta.pregunta"
              label="Pregunta"
              hint="Ingrese la pregunta"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'La pregunta es requerida']"
            >
            </q-input>
          </div>

          <div class="col-12 text-body1 text-bold text-pink-5 q-pt-md">
            Respuestas
          </div>

          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="opcion.opcion"
              label="Opción"
              hint="Ingrese la opción de la respuesta"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-checkbox
              color="pink"
              size="lg"
              left-label
              v-model="opcion.otro"
              label="¿Tiene la opción de otro?"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                :disable="opcion.opcion == null || opcion.opcion == ''"
                color="secondary"
                :icon="opcion.id != null ? 'edit' : 'add'"
                :label="opcion.id != null ? 'Editar' : 'Agregar'"
                @click="agregarOpcion()"
              />
            </div>
          </div>
          <div class="col-12"><TablaRespuestasComp /></div>
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
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useConocelesStore } from "src/stores/conoceles-store";
import TablaRespuestasComp from "./TablaRespuestasComp.vue";

//-----------------------------------------------------------

const $q = useQuasar();
const conocelesStore = useConocelesStore();
const { modal, isEditar, pregunta, list_Preguntas_Identidad, opcion } =
  storeToRefs(conocelesStore);
const numero = ref(null);

//-----------------------------------------------------------

watch(list_Preguntas_Identidad, (val) => {
  let last = list_Preguntas_Identidad.value.length;
  numero.value = last + 1;
});
//-----------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  conocelesStore.actualizarModal(valor);
  conocelesStore.updateEditar(false);
  conocelesStore.initPregunta();
  conocelesStore.initOpcion();
  $q.loading.hide();
};

const agregarOpcion = async () => {
  $q.loading.show();
  let resp = null;

  if (isEditar.value == true) {
    if (opcion.value.id == null) {
      resp = await conocelesStore.createOpcion(opcion.value, pregunta.value.id);
    } else {
      resp = await conocelesStore.updateOpcion(opcion.value);
    }
    if (resp.success) {
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      conocelesStore.loadRespuestas(pregunta.value.id);
    } else {
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
    }
  } else {
    conocelesStore.addOpcion(opcion.value.opcion, opcion.value.otro);
  }
  conocelesStore.initOpcion();
  $q.loading.hide();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
    pregunta.value.opciones = resp = await conocelesStore.updatePregunta(
      pregunta.value.id,
      pregunta.value
    );
  } else {
    pregunta.value.numero = numero.value;
    resp = await conocelesStore.createPregunta(pregunta.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    actualizarModal(false);
    conocelesStore.loadPreguntasIdentidad();
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
