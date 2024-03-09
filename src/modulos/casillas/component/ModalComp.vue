<template>
  <q-dialog
    v-model="modalCasillas"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          {{ !isEditar ? "Registrar casilla" : "Editar casilla" }}
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
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-select
              v-model="municipio_Id"
              :options="list_Municipios"
              label="Municipio"
              hint="Seleccione un municipio"
              lazy-rules
              :rules="[(val) => !!val || 'El municipio es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-select
              v-model="seccion_Id"
              :options="list_Secciones"
              label="Sección"
              hint="Seleccione una sección"
              lazy-rules
              :rules="[(val) => !!val || 'La sección es requerida']"
            >
            </q-select>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-select
              v-model="tipo_casilla_Id"
              :options="list_Tipo_Casillas"
              label="Tipo de casilla"
              hint="Seleccione un tipo de casilla"
              lazy-rules
              :rules="[(val) => !!val || 'El tipo de casilla es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model="casilla.no_Casilla"
              label="Número de casilla"
              hint="Ingrese número de casilla"
              type="number"
              lazy-rules
              :rules="[(val) => !!val || 'El número de casilla es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              type="number"
              v-model="casilla.extension_Contigua"
              label="Extensión contigua"
              hint="Ingrese extensión contigua"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="casilla.listado_Nominal"
              label="Listado nominal"
              hint="Ingrese listado nominal"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El listado nominal es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model="casilla.padron_Electoral"
              label="Padrón electoral"
              hint="Ingrese padrón electoral"
              type="number"
              lazy-rules
              :rules="[(val) => !!val || 'El padrón electoral es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              type="number"
              v-model="casilla.boletas_Entregadas"
              label="Boletas entregadas"
              hint="Ingrese boletas entregadas"
              lazy-rules
              :rules="[(val) => !!val || 'Boletas entregadas es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-select
              v-model="tipo_Seccion_Id"
              :options="tipos_Seccion"
              label="Tipo sección"
              hint="Ingrese tipo de sección"
              lazy-rules
              :rules="[(val) => !!val || 'El tipo de sección es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="casilla.nombre"
              label="Nombre casilla"
              hint="Ingrese nombre de casilla"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre de casilla es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-select
              v-model="tipo_Lugar_Id"
              :options="tipos_Lugar"
              label="Tipo de lugar"
              hint="Seleccione una tipo de lugar"
              lazy-rules
              :rules="[(val) => !!val || 'El tipo de lugar es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model="casilla.domicilio"
              clearable
              autogrow
              color="pink-8"
              label="Domicilio"
              hint="Ingrese domicilio"
              lazy-rules
              :rules="[(val) => !!val || 'El domicilio es requerida']"
            />
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model="casilla.referencia"
              clearable
              autogrow
              color="pink-8"
              label="Referencia"
              hint="Ingrese referencia"
              lazy-rules
              :rules="[(val) => !!val || 'La referencia es requerida']"
            />
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="casilla.ubicacion"
              label="Ubicación"
              hint="Ingrese ubicación"
              autogrow
              clearable
              color="pink-8"
              lazy-rules
              :rules="[(val) => !!val || 'La ubicación es requerida']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              type="number"
              v-model="casilla.latitud_Cartografica"
              label="Latitud cartográfica"
              hint="Ingrese latitud cartográfica"
              clearable
              color="pink-8"
              lazy-rules
              :rules="[
                (val) => !!val || 'La latitud cartográfica es requerida',
              ]"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="casilla.latitud_Google"
              label="Latitud de Google"
              hint="Ingrese latitud de Google"
              type="number"
              clearable
              color="pink-8"
              lazy-rules
              :rules="[(val) => !!val || 'La latitud de Google es requerida']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="casilla.longitud_Cartografica"
              label="Longitud cartográfica"
              hint="Ingrese longitud cartográfica"
              type="number"
              clearable
              color="pink-8"
              lazy-rules
              :rules="[
                (val) => !!val || 'La longitud cartográfica es requerida',
              ]"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="casilla.longitud_Google"
              label="Longitud de Google"
              hint="Ingrese longitud de Google"
              type="number"
              clearable
              color="pink-8"
              lazy-rules
              :rules="[(val) => !!val || 'La longitud de Google es requerida']"
            >
            </q-input>
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
import { onBeforeMount, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useCasillasStore } from "src/stores/casillas-store";
import { useMunicipiosStore } from "src/stores/municipios-store";
import { useSeccionesStore } from "src/stores/secciones-store";
//-----------------------------------------------------------

const $q = useQuasar();
const casillasStore = useCasillasStore();
const municipioStore = useMunicipiosStore();
const seccionesStore = useSeccionesStore();
const { modalCasillas, list_Tipo_Casillas, casilla, isEditar } =
  storeToRefs(casillasStore);
const { list_Municipios } = storeToRefs(municipioStore);
const { list_Secciones } = storeToRefs(seccionesStore);

const municipio_Id = ref(null);
const seccion_Id = ref(null);
const tipo_Seccion_Id = ref(null);
const tipo_casilla_Id = ref(null);
const tipo_Lugar_Id = ref(null);
const tipos_Seccion = ref([
  {
    value: 1,
    label: "NO URBANA",
  },
  {
    value: 2,
    label: "URBANA",
  },
]);

const tipos_Lugar = ref([
  {
    value: 1,
    label: "Edificio",
  },
  {
    value: 2,
    label: "Oficina pública",
  },
  {
    value: 3,
    label: "Lugar público",
  },
  {
    value: 4,
    label: "Particular",
  },
]);
//-----------------------------------------------------------

onBeforeMount(() => {
  municipioStore.loadMunicipios();
  seccionesStore.loadSecciones();
  casillasStore.loadTipoCasillas();
});

//-----------------------------------------------------------

watch(casilla.value, (val) => {
  if (val != null) {
    cargarMunicipio(val);
    cargarSeccion(val);
    cargarTipoCasilla(val);
    cargarTipoLugar(val);
    cargarTipoSeccion(val);
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

const cargarSeccion = (val) => {
  if (seccion_Id.value == null) {
    let seccionoFiltrado = list_Secciones.value.find(
      (x) => x.value == `${val.seccion_Id}`
    );
    seccion_Id.value = seccionoFiltrado;
  }
};

const cargarTipoCasilla = (val) => {
  if (tipo_casilla_Id.value == null) {
    let tipoCasillaFiltrado = list_Tipo_Casillas.value.find(
      (x) => x.value == `${val.tipo_Casilla_Id}`
    );
    tipo_casilla_Id.value = tipoCasillaFiltrado;
  }
};

const cargarTipoLugar = (val) => {
  if (tipo_Lugar_Id.value == null) {
    let tipoLugarFiltrado = tipos_Lugar.value.find(
      (x) => x.value == `${val.tipo_Lugar}`
    );
    tipo_Lugar_Id.value = tipoLugarFiltrado;
  }
};

const cargarTipoSeccion = (val) => {
  if (tipo_Seccion_Id.value == null) {
    let seccionFiltrado = tipos_Seccion.value.find(
      (x) => x.label == `${val.tipo_Seccion}`
    );
    tipo_Seccion_Id.value = seccionFiltrado;
  }
};

const actualizarModal = (valor) => {
  $q.loading.show();
  casillasStore.actualizarModalCasilla(valor);
  limpiar();
  $q.loading.hide();
};

const limpiar = () => {
  $q.loading.show();
  municipio_Id.value = null;
  seccion_Id.value = null;
  tipo_Seccion_Id.value = null;
  tipo_casilla_Id.value = null;
  tipo_Lugar_Id.value = null;
  casillasStore.initCasilla();
  $q.loading.hide();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  casilla.value.municipio_Id = municipio_Id.value.value;
  casilla.value.seccion_Id = seccion_Id.value.value;
  casilla.value.tipo_Casilla_Id = tipo_casilla_Id.value.value;
  casilla.value.tipo_Lugar = tipo_Lugar_Id.value.value;
  casilla.value.tipo_Seccion = tipo_Seccion_Id.value.label;
  if (isEditar.value == true) {
    resp = await casillasStore.updateCasilla(casilla.value);
  } else {
    resp = await casillasStore.createCasilla(casilla.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    actualizarModal(false);
    casillasStore.loadCasillas();
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
