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
          {{ !isEditar ? "Registrar distrito" : "Editar distrito" }}
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
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="distrito.nombre"
              label="Nombre"
              hint="Ingrese nombre del distrito"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre del distrito es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.number="distrito.no_Distrito"
              type="number"
              label="Número del distrito"
              hint="Ingrese número del distrito"
              lazy-rules
              :rules="[(val) => !!val || 'El número de distrito es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="distrito.integracion"
              label="Integración del distrito"
              hint="Ingrese integración del distrito"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'La integración es requerida']"
            >
            </q-input>
          </div>

          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="negative"
                @click="actualizarModal(false)"
              />
              <q-btn
                label="Guardar"
                type="submit"
                color="positive"
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
import { useDistritosStore } from "src/stores/distritos-store";

//-----------------------------------------------------------

const $q = useQuasar();
const distritoStore = useDistritosStore();
const { modal, isEditar, distrito } = storeToRefs(distritoStore);

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  distritoStore.actualizarModal(valor);
  distritoStore.updateEditar(valor);
  distritoStore.initDistrito();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
    resp = await distritoStore.updateDistrito(distrito.value);
  } else {
    resp = await distritoStore.createDistrito(distrito.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    distritoStore.loadDistritos();
    actualizarModal(false);
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
