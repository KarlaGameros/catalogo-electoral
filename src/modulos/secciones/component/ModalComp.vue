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
          {{ !isEditar ? "Registrar sección" : "Editar sección" }}
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
              v-model="distrito_Id"
              :options="list_Distritos"
              label="Seleccione un distrito"
              hint="Seleccione un distrito"
              lazy-rules
              :rules="[(val) => !!val || 'El distrito es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-select
              filled
              v-model="municipio_Id"
              :options="list_Municipios"
              label="Seleccione un municipio"
              hint="Seleccione un municipio"
              lazy-rules
              :rules="[(val) => !!val || 'El municipio es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-select
              filled
              v-model="demarcacion_Id"
              :options="list_Demarcaciones"
              label="Seleccione una demarcación"
              hint="Seleccione una demarcación"
              lazy-rules
              :rules="[(val) => !!val || 'La demarcación es requerida']"
            >
            </q-select>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="seccion.nombre"
              label="Sección"
              hint="Ingrese seccón"
              lazy-rules
              :rules="[(val) => !!val || 'La sección es requerida']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="seccion.cabecera_Localidad"
              label="Cabecera localidad"
              hint="Ingrese cabecera localidad"
              lazy-rules
              :rules="[
                (val) =>
                  !!val || 'El nombre de la cabecera localidad es requerida',
              ]"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="seccion.padron_Electoral"
              label="Padrón electoral"
              hint="Ingrese padrón electoral"
              lazy-rules
              :rules="[(val) => !!val || 'El padrón electoral es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="seccion.listado_Nominal"
              label="Listado nominal"
              hint="Ingrese listado nominal"
              lazy-rules
              :rules="[(val) => !!val || 'El listado nominal es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="seccion.tipo_Seccion"
              label="Tipo de seccón"
              hint="Ingrese tipo de sección"
              lazy-rules
              :rules="[(val) => !!val || 'El tipo de sección es requerido']"
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
import { onBeforeMount, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useDemarcacionesStore } from "src/stores/demarcaciones-store";
import { useMunicipiosStore } from "src/stores/municipios-store";
import { useDistritosStore } from "src/stores/distritos-store";
import { useSeccionesStore } from "src/stores/secciones-store";

//-----------------------------------------------------------

const $q = useQuasar();
const demarcacionStore = useDemarcacionesStore();
const municipioStore = useMunicipiosStore();
const distritosStore = useDistritosStore();
const seccionesStore = useSeccionesStore();
const { list_Demarcaciones } = storeToRefs(demarcacionStore);
const { list_Municipios } = storeToRefs(municipioStore);
const { list_Distritos } = storeToRefs(distritosStore);
const { seccion, modal, isEditar } = storeToRefs(seccionesStore);
const municipio_Id = ref(null);
const distrito_Id = ref(null);
const demarcacion_Id = ref(null);
//-----------------------------------------------------------

onBeforeMount(() => {
  municipioStore.loadMunicipios();
  distritosStore.loadDistritos();
  demarcacionStore.loadDemarcaciones();
});
//-----------------------------------------------------------

watch(seccion.value, (val) => {
  if (val != null) {
    cargarDistrito(val);
    cargarMunicipio(val);
    cargarDemarcacion(val);
  }
});

//-----------------------------------------------------------

const cargarDistrito = (val) => {
  if (distrito_Id.value == null) {
    let distritoFiltrado = list_Distritos.value.find(
      (x) => x.value == `${val.distrito_Id}`
    );
    distrito_Id.value = distritoFiltrado;
  }
};

const cargarMunicipio = (val) => {
  if (municipio_Id.value == null) {
    let municipioFiltrado = list_Municipios.value.find(
      (x) => x.value == `${val.municipio_Id}`
    );
    municipio_Id.value = municipioFiltrado;
  }
};

const cargarDemarcacion = (val) => {
  if (demarcacion_Id.value == null) {
    let demarcacionFiltrado = list_Demarcaciones.value.find(
      (x) => x.value == `${val.demarcacion_Id}`
    );
    demarcacion_Id.value = demarcacionFiltrado;
  }
};

const actualizarModal = (valor) => {
  $q.loading.show();
  seccionesStore.actualizarModal(valor);
  seccionesStore.updateEditar(false);
  limpiar();
  $q.loading.hide();
};

const limpiar = () => {
  distrito_Id.value = null;
  municipio_Id.value = null;
  demarcacion_Id.value = null;
  seccionesStore.initSeccion();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  seccion.value.municipio_Id = municipio_Id.value.value;

  seccion.value.distrito_Id = distrito_Id.value.value;
  seccion.value.demarcacion_Id = demarcacion_Id.value.value;

  if (isEditar.value == true) {
    resp = await seccionesStore.updateSeccion(seccion.value);
  } else {
    resp = await seccionesStore.createSeccion(seccion.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    seccionesStore.loadSecciones();
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
