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
            v-if="modulo == null ? false : modulo.registrar"
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
    <ModalRequisitos />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useAuthStore } from "src/stores/auth-store";
import { useTipoEleccionesStore } from "src/stores/tipo-elecciones";
import TablaComp from "../component/TablaComp.vue";
import ModalComp from "../component/ModalComp.vue";
import ModalRequisitos from "../component/ModalRequisitos.vue";

//--------------------------------------------------------------------

const $q = useQuasar();
const eleccionesStore = useTipoEleccionesStore();
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SCE-CAT-DI";

//--------------------------------------------------------------------

onBeforeMount(() => {
  leerPermisos();
});

//--------------------------------------------------------------------

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const actualizarModal = (valor) => {
  $q.loading.show();
  eleccionesStore.actualizarModal(valor);
  $q.loading.hide();
};
</script>

<style scope></style>
