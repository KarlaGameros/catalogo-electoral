<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Secciones" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-right q-pa-md items-start q-gutter-md">
          <q-btn
            type="button"
            color="pink-1"
            icon-right="add_circle_outline"
            label="Nuevo"
            @click="actualizarModal(true)"
          />
        </div>
      </div>
    </div>
    <TablaComp />
    <ModalComp />
  </q-page>
</template>
<script setup>
import { useSeccionesStore } from "src/stores/secciones-store";
import TablaComp from "../component/TablaComp.vue";
import ModalComp from "../component/ModalComp.vue";
import { useQuasar } from "quasar";

//--------------------------------------------------------------------
const $q = useQuasar();
const seccionesStore = useSeccionesStore();

const actualizarModal = (valor) => {
  $q.loading.show();
  seccionesStore.actualizarModal(valor);
  $q.loading.hide();
};
</script>

<style scope></style>
