<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <div class="q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el icon="home" to="/" />
            <q-breadcrumbs-el icon="list_alt" label="Modelos actas" />
          </q-breadcrumbs>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-right q-pa-md items-start q-gutter-md">
          <!-- v-if="modulo == null ? false : modulo.registrar" -->
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
import { onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { useModelosStore } from "src/stores/modelos-store";
import { storeToRefs } from "pinia";
import TablaComp from "../component/TablaComp.vue";
import ModalComp from "../component/ModalComp.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const authStore = useAuthStore();
const modelosStore = useModelosStore();
const { modulo } = storeToRefs(authStore);
//const siglas = "SCE-CAT-DI";

//--------------------------------------------------------------------

onBeforeMount(() => {
  //leerPermisos();
});

//--------------------------------------------------------------------

// const leerPermisos = async () => {
//   $q.loading.show();
//   await authStore.loadModulo(siglas);
//   $q.loading.hide();
// };

const actualizarModal = (valor) => {
  $q.loading.show();
  modelosStore.actualizarModal(valor);
  $q.loading.hide();
};
</script>
