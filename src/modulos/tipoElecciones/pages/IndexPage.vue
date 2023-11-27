<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Tipo de elecciones" />
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
import { useTipoEleccionesStore } from "src/stores/tipo-elecciones";
import TablaComp from "../component/TablaComp.vue";
import ModalComp from "../component/ModalComp.vue";
//--------------------------------------------------------------------

const $q = useQuasar();
const eleccionesStore = useTipoEleccionesStore();

//--------------------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  eleccionesStore.actualizarModal(valor);
  $q.loading.hide();
};
</script>

<style scope></style>
