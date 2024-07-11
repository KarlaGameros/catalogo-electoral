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
          {{ !isEditar ? "Registrar modelo de acta" : "Editar modelo de acta" }}
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
              label="Tipo de elección"
              v-model="eleccion_Id"
              :options="list_Tipos_Elecciones"
              hint="Seleccione tipo de elección"
              lazy-rules
              :rules="[(val) => !!val || 'La elección es requerida']"
            />
          </div>
          <div
            v-if="eleccion_Id != null && eleccion_Id.siglas == 'DIP'"
            class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
          >
            <q-select
              label="Distrito"
              v-model="distrito_Id"
              :options="list_Distritos"
              hint="Seleccione distrito"
              lazy-rules
              :rules="[(val) => !!val || 'El distrito es requerido']"
            />
          </div>
          <div
            v-if="eleccion_Id != null && eleccion_Id.siglas != 'DIP'"
            class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
          >
            <q-select
              label="Municipio"
              v-model="municipio_Id"
              :options="list_Municipios"
              hint="Seleccione municipio"
              lazy-rules
              :rules="[(val) => !!val || 'El municipio es requerido']"
            />
          </div>
          <div
            v-if="eleccion_Id != null && eleccion_Id.siglas == 'REG'"
            class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
          >
            <q-select
              label="Demarcación"
              v-model="demarcacion_Id"
              :options="list_Demarcaciones"
              hint="Seleccione demarcación"
              lazy-rules
              :rules="[(val) => !!val || 'La demarcación es requerida']"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="modelo.ruta"
              label="Ruta"
              hint="Ruta"
              lazy-rules
              :rules="[(val) => !!val || 'La ruta es requerida']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
            <q-checkbox
              size="lg"
              class="text-bold"
              color="pink"
              left-label
              v-model="modelo.estatal"
              label="Estatal"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="red"
                @click="actualizarModal(false)"
              />
              <q-btn
                label="Guardar"
                type="submit"
                color="secondary"
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
import { useModelosStore } from "src/stores/modelos-store";
import { onBeforeMount, ref, watch } from "vue";
import { useTipoEleccionesStore } from "src/stores/tipo-elecciones";
import { useDistritosStore } from "src/stores/distritos-store";
import { useMunicipiosStore } from "src/stores/municipios-store";
import { useDemarcacionesStore } from "src/stores/demarcaciones-store";

//-----------------------------------------------------------

const $q = useQuasar();
const municipiosStore = useMunicipiosStore();
const modelosStore = useModelosStore();
const eleccionesStore = useTipoEleccionesStore();
const distritosStore = useDistritosStore();
const demarcacionesStore = useDemarcacionesStore();
const { modal, isEditar, modelo } = storeToRefs(modelosStore);
const { list_Demarcaciones } = storeToRefs(demarcacionesStore);
const { list_Tipos_Elecciones } = storeToRefs(eleccionesStore);
const { list_Distritos } = storeToRefs(distritosStore);
const { list_Municipios } = storeToRefs(municipiosStore);
const municipio_Id = ref(null);
const distrito_Id = ref(null);
const demarcacion_Id = ref(null);
const eleccion_Id = ref(null);

//-----------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

watch(modelo.value, (val) => {
  if (val != null) {
    cargarEleccion(val);
    cargarDistrito(val);
  }
});

watch(municipio_Id, (val) => {
  if (val != null) {
    demarcacionesStore.loadDemarcacionesByMunicipio(val.value);
  }
});

const cargarEleccion = async (val) => {
  if (eleccion_Id.value == null) {
    let eleccionFiltrado = list_Tipos_Elecciones.value.find(
      (x) => x.value == val.tipo_Eleccion_Id
    );
    eleccion_Id.value = eleccionFiltrado;
  }
};

const cargarDistrito = async (val) => {
  if (distrito_Id.value == null) {
    let eleccionFiltrado = list_Distritos.value.find(
      (x) => x.value == val.distrito_Id
    );
    distrito_Id.value = eleccionFiltrado;
  }
};

const cargarData = async () => {
  await eleccionesStore.loadTiposEleeciones();
  await distritosStore.loadDistritos();
  await municipiosStore.loadMunicipios();
};

const limpiar = () => {
  municipio_Id.value = null;
  distrito_Id.value = null;
  demarcacion_Id.value = null;
  eleccion_Id.value = null;
};

const actualizarModal = (valor) => {
  limpiar();
  modelosStore.actualizarModal(valor);
  modelosStore.updateEditar(valor);
  modelosStore.initModelo();
};

const onSubmit = async () => {
  let resp = null;
  modelo.value.tipo_Eleccion_Id = eleccion_Id.value.value;

  if (eleccion_Id.value != null && eleccion_Id.value.siglas == "REG") {
    modelo.value.municipio_Id = municipio_Id.value.value;
    modelo.value.demarcacion_Id = demarcacion_Id.value.value;
    modelo.value.distrito_Id = null;
  }
  if (eleccion_Id.value != null && eleccion_Id.value.siglas == "PYS") {
    modelo.value.municipio_Id = municipio_Id.value.value;
    modelo.value.distrito_Id = null;
    modelo.value.demarcacion_Id = null;
  }
  if (eleccion_Id.value != null && eleccion_Id.value.siglas == "DIP") {
    modelo.value.distrito_Id = distrito_Id.value.value;
    modelo.value.demarcacion_Id = null;
    modelo.value.municipio_Id = null;
  }
  $q.loading.show();
  if (isEditar.value == true) {
    resp = await modelosStore.updateModelo(modelo.value);
  } else {
    resp = await modelosStore.createModelo(modelo.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    await modelosStore.loadModelos(eleccion_Id.value.value);
    modelosStore.initModelo();
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
