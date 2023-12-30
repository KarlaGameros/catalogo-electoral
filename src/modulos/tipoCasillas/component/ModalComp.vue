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
          {{
            !isEditar ? "Registrar tipo de casilla" : "Editar tipo de casilla"
          }}
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
              v-model.trim="tipo_casilla.nombre"
              label="Nombre"
              hint="Ingrese nombre del tipo de casilla"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="tipo_casilla.siglas"
              label="Siglas"
              hint="Ingrese las siglas del tipo de casilla"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'Las siglas son requeridas']"
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
import { useCasillasStore } from "src/stores/casillas-store";

//-----------------------------------------------------------

const $q = useQuasar();
const casillasStore = useCasillasStore();
const { modal, isEditar, tipo_casilla } = storeToRefs(casillasStore);

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  casillasStore.actualizarModal(valor);
  casillasStore.updateEditar(valor);
  casillasStore.initCasilla();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
    resp = await casillasStore.updateTipoCasilla(tipo_casilla.value);
  } else {
    resp = await casillasStore.createTipoCasilla(tipo_casilla.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    casillasStore.loadTipoCasillas();
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
