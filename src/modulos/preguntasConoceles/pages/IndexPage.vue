<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Partidos políticos" />
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
    <ModalSubOpciones />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { useConocelesStore } from "src/stores/conoceles-store";
import TablaComp from "../component/TablaComp.vue";
import ModalComp from "../component/ModalComp.vue";
import ModalSubOpciones from "../component/ModalSubOpciones.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const conocelesStore = useConocelesStore();

//--------------------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  conocelesStore.actualizarModal(valor);
  $q.loading.hide();
};
</script>

<style scope></style>
