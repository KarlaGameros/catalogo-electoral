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
          {{ !isEditar ? "Registrar" : "Editar" }}
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
              v-model="eleccion_Id"
              :options="
                list_Tipos_Elecciones.filter(
                  (x) => x.activo == true && x.siglas != 'PYS'
                )
              "
              label="Seleccione tipo de elección"
              hint="Seleccione tipo de elección"
            >
            </q-select>
          </div>
          <div
            v-if="eleccion_Id != null && eleccion_Id.siglas == 'DIP'"
            class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
          >
            <q-select
              v-model="distrito_Id"
              :options="list_Distritos"
              label="Seleccione un distrito"
              hint="Seleccione un distrito"
            >
            </q-select>
          </div>
          <div
            v-if="eleccion_Id != null && eleccion_Id.siglas != 'DIP'"
            class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
          >
            <q-select
              v-model="municipio_Id"
              :options="list_Municipios"
              label="Seleccione un municipio"
              hint="Seleccione un municipio"
            >
            </q-select>
          </div>
          <div
            v-if="eleccion_Id != null && eleccion_Id.siglas != 'DIP'"
            class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
          >
            <q-select
              v-model="demarcacion_Id"
              :options="list_Demarcaciones"
              label="Seleccione demarcación"
              hint="Seleccione demarcación"
              lazy-rules
              :rules="[(val) => !!val || 'Es requerido']"
            >
            </q-select>
          </div>
          <div align="center" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-checkbox
              size="lg"
              class="text-bold"
              color="pink"
              left-label
              v-model="voto_Valido"
              label="Voto valido común RP"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-12 justify-end">
            <br />
            <br />
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
import { useComunesRegistradasStore } from "src/stores/comunesRegistradas-store";
import { useMunicipiosStore } from "src/stores/municipios-store";
import { useDemarcacionesStore } from "src/stores/demarcaciones-store";
import { useDistritosStore } from "src/stores/distritos-store";
import { useTipoEleccionesStore } from "src/stores/tipo-elecciones";

//-----------------------------------------------------------

const $q = useQuasar();
const comunesRegistradasStore = useComunesRegistradasStore();
const municipioStore = useMunicipiosStore();
const demarcacionesStore = useDemarcacionesStore();
const distritosStore = useDistritosStore();
const eleccionesStore = useTipoEleccionesStore();
const { list_Tipos_Elecciones } = storeToRefs(eleccionesStore);
const { list_Distritos } = storeToRefs(distritosStore);
const { list_Municipios } = storeToRefs(municipioStore);
const { list_Demarcaciones } = storeToRefs(demarcacionesStore);
const { modal, isEditar, comunRegistrada } = storeToRefs(
  comunesRegistradasStore
);
const eleccion_Id = ref(null);
const distrito_Id = ref(null);
const municipio_Id = ref(null);
const demarcacion_Id = ref(null);
const voto_Valido = ref(false);

//-----------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//-----------------------------------------------------------

watch(comunRegistrada.value, (val) => {
  if (val.id != null) {
    cargarEleccion(val);
    if (val.municipio_Id != null) {
      cargarMunicipioDemarcacion(val);
    }
    if (val.distrito_Id != null) {
      cargarDistrito(val);
    }
    voto_Valido.value = val.voto_Valido_Comun_RP;
  }
});

watch(distrito_Id, (val) => {
  if (val != null) {
    municipio_Id.value = null;
    demarcacion_Id.value = null;
  }
});

watch(municipio_Id, async (val) => {
  if (val != null && val != undefined) {
    distrito_Id.value = null;
    await demarcacionesStore.loadDemarcacionesByMunicipio(val.value);
  }
});

const cargarEleccion = async (val) => {
  if (eleccion_Id.value == null) {
    let eleccionFiltrado = list_Tipos_Elecciones.value.find(
      (x) => x.value == `${val.tipo_Eleccion_Id}`
    );
    eleccion_Id.value = eleccionFiltrado;
  }
};

const cargarDistrito = async (val) => {
  if (distrito_Id.value == null) {
    let distritoFiltrado = list_Distritos.value.find(
      (x) => x.value == `${val.distrito_Id}`
    );
    distrito_Id.value = distritoFiltrado;
  }
};

const cargarMunicipioDemarcacion = async (val) => {
  if (municipio_Id.value == null) {
    let municipioFiltrado = list_Municipios.value.find(
      (x) => x.value == `${val.municipio_Id}`
    );
    municipio_Id.value = municipioFiltrado;
  }
  await demarcacionesStore.loadDemarcacionesByMunicipio(val.municipio_Id);
  if (demarcacion_Id.value == null) {
    let demarcacionFiltrado = list_Demarcaciones.value.find(
      (x) => x.value == `${val.demarcacion_Id}`
    );
    demarcacion_Id.value = demarcacionFiltrado;
  }
};

const cargarData = async () => {
  await eleccionesStore.loadTiposEleeciones();
  await municipioStore.loadMunicipios();
  await distritosStore.loadDistritos();
};

const actualizarModal = (valor) => {
  comunesRegistradasStore.initComun();
  comunesRegistradasStore.actualizarModal(valor);
  comunesRegistradasStore.updateEditar(valor);
  eleccion_Id.value = null;
  distrito_Id.value = null;
  municipio_Id.value = null;
  demarcacion_Id.value = null;
  voto_Valido.value = false;
};

const onSubmit = async () => {
  let resp = null;
  if (
    distrito_Id.value == null &&
    municipio_Id.value == null &&
    demarcacion_Id.value == null
  ) {
    $q.dialog({
      title: "Atención",
      message: "No ha seleccionado alguna opción",
      icon: "Warning",
      persistent: true,
      transitionShow: "scale",
      transitionHide: "scale",
      ok: false,
      cancel: {
        color: "negative",
        label: "Cerra",
      },
    });
  } else {
    $q.loading.show();
    if (distrito_Id.value != null) {
      comunRegistrada.value.distrito_Id = distrito_Id.value.value;
    }
    if (municipio_Id.value != null) {
      comunRegistrada.value.municipio_Id = municipio_Id.value.value;
    }
    if (demarcacion_Id.value != null) {
      comunRegistrada.value.demarcacion_Id = demarcacion_Id.value.value;
    }
    comunRegistrada.value.tipo_Eleccion_Id = eleccion_Id.value.value;
    comunRegistrada.value.voto_Valido_Comun_RP = voto_Valido.value;
    if (isEditar.value == true) {
      resp = await comunesRegistradasStore.updateComunRegistrada(
        comunRegistrada.value
      );
    } else {
      resp = await comunesRegistradasStore.createComunesRegistradas(
        comunRegistrada.value
      );
    }
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      comunesRegistradasStore.loadComunesRegistradas();
      actualizarModal(false);
    } else {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
    }
  }
};
</script>
