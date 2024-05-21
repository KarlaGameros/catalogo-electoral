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
          {{
            !isEditar ? "Registrar voto anticipado" : "Editar voto anticipado"
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
      <q-card-section>
        <q-form class="row q-col-gutter-xs" @submit="onSubmit">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs">
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
            v-if="eleccion_Siglas == 'DIP'"
            class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs"
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
            v-if="eleccion_Siglas == 'PYS' || eleccion_Siglas == 'REG'"
            class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs"
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
            v-if="eleccion_Siglas == 'REG'"
            class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs"
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
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pa-xs">
            <q-input
              v-model="voto_Anticipado.listado_Nominal"
              label="Listado nominal"
              lazy-rules
              :rules="[(val) => !!val || 'El listado nominal es requerido']"
            />
          </div>
          <div class="col-12 justify-end q-pt-lg">
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
import { onBeforeMount, ref, watch } from "vue";
import { useVotoAnticipado } from "src/stores/voto-anticipado";
import { useTipoEleccionesStore } from "src/stores/tipo-elecciones";
import { useDistritosStore } from "src/stores/distritos-store";
import { useMunicipiosStore } from "src/stores/municipios-store";
import { useDemarcacionesStore } from "src/stores/demarcaciones-store";

//-----------------------------------------------------------

const $q = useQuasar();
const votoanticipadoStore = useVotoAnticipado();
const eleccionesStore = useTipoEleccionesStore();
const distritosStore = useDistritosStore();
const municipioStore = useMunicipiosStore();
const demarcacionesStore = useDemarcacionesStore();
const { modal, isEditar, voto_Anticipado } = storeToRefs(votoanticipadoStore);
const { list_Tipos_Elecciones } = storeToRefs(eleccionesStore);
const { list_Distritos } = storeToRefs(distritosStore);
const { list_Municipios } = storeToRefs(municipioStore);
const { list_Demarcaciones } = storeToRefs(demarcacionesStore);
const eleccion_Id = ref(null);
const distrito_Id = ref(null);
const municipio_Id = ref(null);
const demarcacion_Id = ref(null);
const eleccion_Siglas = ref(null);

//-----------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

watch(eleccion_Id, (val) => {
  if (val != null) {
    eleccion_Siglas.value = val.siglas;
  }
});

watch(voto_Anticipado.value, (val) => {
  if (val.id != null) {
    cargarEleccion(val);
    cargarDistrito(val);
    cargarMunicipio(val);
  }
});

watch(municipio_Id, async (val) => {
  if (val != null) {
    await demarcacionesStore.loadDemarcacionesByMunicipio(val.value);
  }
});

const cargarData = async () => {
  await eleccionesStore.loadTiposEleeciones();
  await distritosStore.loadDistritos();
  await municipioStore.loadMunicipios();
};

const cargarEleccion = async (val) => {
  if (eleccion_Id.value == null) {
    let eleccionFiltrado = list_Tipos_Elecciones.value.find(
      (x) => x.value == `${val.tipo_Eleccion_Id}`
    );
    eleccion_Id.value = eleccionFiltrado;
    eleccion_Siglas.value = eleccionFiltrado.siglas;
  }
};
const cargarDistrito = async (val) => {
  if (eleccion_Siglas.value == "DIP") {
    if (distrito_Id.value == null) {
      let distritoFiltrado = list_Distritos.value.find(
        (x) => x.value == `${val.distrito_Id}`
      );
      distrito_Id.value = distritoFiltrado;
    }
  }
};
const cargarMunicipio = async (val) => {
  if (eleccion_Siglas.value != "DIP") {
    if (municipio_Id.value == null) {
      let municipioFiltrado = list_Municipios.value.find(
        (x) => x.value == `${val.municipio_Id}`
      );
      municipio_Id.value = municipioFiltrado;
    }
    if (eleccion_Siglas.value == "REG") {
      await demarcacionesStore.loadDemarcacionesByMunicipio(val.municipio_Id);
      if (demarcacion_Id.value == null) {
        let demarcacionFiltrado = list_Demarcaciones.value.find(
          (x) => x.value == `${val.demarcacion_Id}`
        );
        demarcacion_Id.value = demarcacionFiltrado;
      }
    }
  }
};

const actualizarModal = (valor) => {
  eleccion_Siglas.value = null;
  distrito_Id.value = null;
  municipio_Id.value = null;
  demarcacion_Id.value = null;
  eleccion_Id.value = null;
  votoanticipadoStore.actualizarModal(valor);
  votoanticipadoStore.updateEditar(valor);
  votoanticipadoStore.initVotoAnticipado();
};

const onSubmit = async () => {
  let resp = null;
  if (eleccion_Siglas.value == "DIP") {
    voto_Anticipado.value.distrito_Id = distrito_Id.value.value;
  } else if (eleccion_Siglas.value == "PYS") {
    voto_Anticipado.value.municipio_Id = municipio_Id.value.value;
  } else {
    voto_Anticipado.value.municipio_Id = municipio_Id.value.value;
    voto_Anticipado.value.demarcacion_Id = demarcacion_Id.value.value;
  }
  voto_Anticipado.value.tipo_Eleccion_Id = eleccion_Id.value.value;

  $q.loading.show();
  if (isEditar.value == true) {
    resp = await votoanticipadoStore.updateVotoAnticipado(
      voto_Anticipado.value
    );
  } else {
    resp = await votoanticipadoStore.createVotoAnticipado(
      voto_Anticipado.value
    );
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    await votoanticipadoStore.loadVotoAnticipado();
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
