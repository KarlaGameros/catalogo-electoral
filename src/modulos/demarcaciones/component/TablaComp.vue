<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Demarcaciones"
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
            <div v-else-if="col.name === 'indigena'">
              <q-icon
                size="sm"
                :color="props.row.indigena == true ? 'green' : 'red'"
                :name="props.row.indigena == true ? 'done' : 'close'"
              />
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
import { useDemarcacionesStore } from "../../../stores/demarcaciones-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const demarcacionesStore = useDemarcacionesStore();
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const { list_Demarcaciones } = storeToRefs(demarcacionesStore);
const siglas = "SCE-CAT-DE";

//-------------------------------------------------------------------

onBeforeMount(() => {
  demarcacionesStore.loadDemarcaciones();
  leerPermisos();
});

//-------------------------------------------------------------------

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const columns = [
  {
    name: "municipio",
    align: "center",
    label: "Municipio",
    field: "municipio",
    sortable: true,
  },
  {
    name: "nombre",
    align: "center",
    label: "Demarcación",
    field: "nombre",
    sortable: true,
  },
  {
    name: "no_Demarcacion",
    align: "center",
    label: "Número de demarcación",
    field: "no_Demarcacion",
    sortable: true,
  },
  {
    name: "indigena",
    align: "center",
    label: "Indígena",
    field: "indigena",
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
const editar = async (id) => {
  $q.loading.show();
  await demarcacionesStore.loadDemarcacion(id);
  demarcacionesStore.updateEditar(true);
  demarcacionesStore.actualizarModal(true);
  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar demarcacion",
    message: "¿Está seguro de eliminar la demarcacion?",
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
    const resp = await demarcacionesStore.deleteDemarcacion(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      demarcacionesStore.loadDemarcaciones();
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
