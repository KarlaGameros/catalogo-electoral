<template>
  <q-dialog
    v-model="modalIntegracion"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          {{
            !isEditar
              ? `Registrar integración: ${coalicion.nombre}`
              : `Editar integración: ${coalicion.nombre}`
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

      <q-form class="q-col-gutter-xs" @submit="onSubmit">
        <q-card-section class="row q-pl-md">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-sm">
            <q-select
              v-model.trim="partido_Id"
              :options="list_Partidos_Politicos"
              label="Seleccione un actor político"
              hint="Seleccione un actor político"
              lazy-rules
              :rules="[(val) => !!val || 'El actor político es requerido']"
            >
            </q-select>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-md">
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="red"
                @click="actualizarModal(false)"
              />
              <q-btn
                label="Agregar"
                type="submit"
                color="secondary"
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-md">
          <TablaIntegraciones />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useCoalicionesStore } from "src/stores/coaliciones-store";
import { usePartidosPoliticosStore } from "src/stores/partidos-politicos-store";
import { onBeforeMount, ref } from "vue";
import TablaIntegraciones from "../component/TablaIntegraciones.vue";

//-----------------------------------------------------------

const $q = useQuasar();
const coalicionStore = useCoalicionesStore();
const partidosPoliticosStore = usePartidosPoliticosStore();
const { modalIntegracion, integracion, coalicion, isEditar, list_Integracion } =
  storeToRefs(coalicionStore);
const { list_Partidos_Politicos } = storeToRefs(partidosPoliticosStore);
const partido_Id = ref(null);
const porcentaje = ref(null);

//-----------------------------------------------------------

onBeforeMount(() => {
  partidosPoliticosStore.loadPartidosPoliticos();
});

const actualizarModal = (valor) => {
  coalicionStore.actualizarModalIntegracion(valor);
  coalicionStore.initCoalicion();
  coalicionStore.initIntegracion();
};

const onSubmit = async () => {
  $q.loading.show();
  let resp = null;
  integracion.value.partido_Id = partido_Id.value.value;
  if (coalicion.value.comun == true) {
    integracion.value.porcentaje = porcentaje.value;
  }
  let filtro = list_Integracion.value.find(
    (x) => x.partido_Id == partido_Id.value.value
  );
  if (filtro == undefined) {
    resp = await coalicionStore.createIntegracion(
      coalicion.value.id,
      integracion.value
    );
    if (resp.success) {
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      coalicionStore.loadCoaliciones();
      coalicionStore.loadIntegracionesByCoalicion(coalicion.value.id);
      partido_Id.value = null;
      porcentaje.value = null;
    } else {
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
    }
  } else {
    $q.dialog({
      title: "Atención",
      message: "El partido ya se agrego",
      icon: "Warning",
      persistent: true,
      transitionShow: "scale",
      transitionHide: "scale",
    });
  }

  $q.loading.hide();
};
</script>

<style></style>
