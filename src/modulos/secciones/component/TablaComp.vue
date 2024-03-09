<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Secciones"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :pagination="pagination"
      class="my-sticky-last-column-table"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div v-if="col.name === 'id'">
              <q-btn
                v-if="modulo == null ? false : modulo.actualizar"
                flat
                round
                color="pink"
                icon="edit"
                @click="editar(col.value)"
              >
                <q-tooltip>Editar demarcación</q-tooltip>
              </q-btn>
              <q-btn
                v-if="modulo == null ? false : modulo.eliminar"
                flat
                round
                color="pink"
                icon="delete"
                @click="eliminar(col.value)"
              >
                <q-tooltip>Eliminar demarcación</q-tooltip>
              </q-btn>
            </div>

            <label v-else>{{ col.value }}</label>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { onBeforeMount, ref } from "vue";
import { useSeccionesStore } from "../../../stores/secciones-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const seccionesStore = useSeccionesStore();
const authStore = useAuthStore();
const { list_Secciones } = storeToRefs(seccionesStore);
const { modulo } = storeToRefs(authStore);
const siglas = "SCE-CAT-SE";

//-------------------------------------------------------------------

onBeforeMount(() => {
  seccionesStore.loadSecciones();
  leerPermisos();
});

//-------------------------------------------------------------------

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const editar = async (id) => {
  $q.loading.show();
  await seccionesStore.loadSeccion(id);
  seccionesStore.updateEditar(true);
  seccionesStore.actualizarModal(true);
  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar sección",
    message: "¿Está seguro de eliminar la sección?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, eliminar",
    },
    cancel: {
      color: "negative",
      label: " No Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await seccionesStore.deleteCasilla(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      seccionesStore.loadSecciones();
    } else {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
    }
  });
};

//-------------------------------------------------------------------

const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Sección",
    field: "nombre",
    sortable: true,
  },
  {
    name: "cabecera_Localidad",
    align: "center",
    label: "Cabecera localidad",
    field: "cabecera_Localidad",
    sortable: true,
  },
  {
    name: "padron_Electoral",
    align: "center",
    label: "Padrón electoral",
    field: "padron_Electoral",
    sortable: true,
  },
  {
    name: "listado_Nominal",
    align: "center",
    label: "Listado nominal",
    field: "listado_Nominal",
    sortable: true,
  },
  {
    name: "tipo_Seccion",
    align: "center",
    label: "Tipo sección",
    field: "tipo_Seccion",
    sortable: true,
  },
  {
    name: "distrito",
    align: "center",
    label: "Distrito",
    field: "distrito",
    sortable: true,
  },
  {
    name: "municipio",
    align: "center",
    label: "Municipio",
    field: "municipio",
    sortable: true,
  },
  {
    name: "demarcacion",
    align: "center",
    label: "Demarcación",
    field: "demarcacion",
    sortable: true,
  },
  {
    name: "id",
    align: "center",
    label: "Acciones",
    field: "id",
    sortable: true,
  },
];

const filter = ref("");

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 5,
});

//-------------------------------------------------------------------
</script>

<style lang="sass">
.my-sticky-last-column-table
  thead tr:last-child th:last-child
    /* bg color is important for th; just specify one */
    background-color: white

  td:last-child
    background-color: white

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
