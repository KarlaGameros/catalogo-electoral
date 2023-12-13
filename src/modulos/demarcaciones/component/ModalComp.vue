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
          {{ !isEditar ? "Registrar demarcación" : "Editar demarcación" }}
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
            <q-select
              filled
              v-model.trim="municipio_Id"
              :options="list_Municipios"
              label="Seleccione un municipio"
              hint="Seleccione un municipio"
              lazy-rules
              :rules="[(val) => !!val || 'El municipio es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="demarcacion.nombre"
              label="Nombre de la demarcación"
              hint="Ingrese nombre de la demarcación"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.number="demarcacion.no_Demarcacion"
              type="number"
              label="Número de demarcación"
              hint="Ingrese número de demarcación"
              lazy-rules
              :rules="[
                (val) => !!val || 'El número de demarcación es requerida',
              ]"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-checkbox
              color="pink"
              v-model="is_Indigena"
              label="Es indígena"
            />
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
import { useDemarcacionesStore } from "src/stores/demarcaciones-store";
import { onBeforeMount, ref, watch } from "vue";
import { useMunicipiosStore } from "src/stores/municipios-store";

//-----------------------------------------------------------

const $q = useQuasar();
const demarcacionStore = useDemarcacionesStore();
const municipioStore = useMunicipiosStore();
const { modal, isEditar, demarcacion } = storeToRefs(demarcacionStore);
const { list_Municipios } = storeToRefs(municipioStore);
const municipio_Id = ref(null);
const is_Indigena = ref(false);

//-----------------------------------------------------------

onBeforeMount(() => {
  municipioStore.loadMunicipios();
});

//-----------------------------------------------------------

watch(demarcacion.value, (val) => {
  if (val.id != null) {
    cargarMunicipio(val);
  }
});

//-----------------------------------------------------------

const cargarMunicipio = (val) => {
  if (municipio_Id.value == null) {
    let municipioFiltrado = list_Municipios.value.find(
      (x) => x.value == `${val.municipio_Id}`
    );
    municipio_Id.value = municipioFiltrado;
  }
};

const actualizarModal = (valor) => {
  demarcacionStore.actualizarModal(valor);
  demarcacionStore.updateEditar(valor);
  demarcacionStore.initDemarcacion();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  demarcacion.value.municipio_Id = municipio_Id.value.value;
  demarcacion.value.indigena = is_Indigena.value;
  if (isEditar.value == true) {
    resp = await demarcacionStore.updateDemarcacion(demarcacion.value);
  } else {
    resp = await demarcacionStore.createDemarcacion(demarcacion.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    demarcacionStore.loadDemarcaciones();
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
