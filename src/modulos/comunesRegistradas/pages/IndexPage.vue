<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Comunes registradas" />
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
import { useQuasar } from "quasar";
import { onBeforeMount } from "vue";
import { useComunesRegistradasStore } from "src/stores/comunesRegistradas-store";
import TablaComp from "../components/TablaComp.vue";
import ModalComp from "../components/ModalComp.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const comunesRegistradasStore = useComunesRegistradasStore();

//--------------------------------------------------------------------

onBeforeMount(() => {});

//--------------------------------------------------------------------

const actualizarModal = (valor) => {
  comunesRegistradasStore.actualizarModal(valor);
};
</script>
