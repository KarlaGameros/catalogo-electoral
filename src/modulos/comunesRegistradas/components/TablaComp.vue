<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Comunes_Registradas"
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
                flat
                round
                color="pink"
                icon="edit"
                @click="editar(col.value)"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="pink"
                icon="delete"
                @click="eliminar(col.value)"
              >
                <q-tooltip>Eliminar</q-tooltip>
              </q-btn>
            </div>
            <div v-else-if="col.name === 'voto_Valido_Comun_RP'">
              <q-icon
                size="sm"
                :color="col.value == true ? 'green' : 'red'"
                :name="col.value == true ? 'done' : 'close'"
              />
            </div>
            <div v-else-if="col.name === 'rp'">
              <q-icon
                size="sm"
                :color="col.value == true ? 'green' : 'red'"
                :name="col.value == true ? 'done' : 'close'"
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
import { onBeforeMount, ref } from "vue";
import { useComunesRegistradasStore } from "../../../stores/comunesRegistradas-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const comunesRegistradasStore = useComunesRegistradasStore();
const { list_Comunes_Registradas } = storeToRefs(comunesRegistradasStore);

//-------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//-------------------------------------------------------------------

const cargarData = async () => {
  $q.loading.show();
  await comunesRegistradasStore.loadComunesRegistradas();
  $q.loading.hide();
};

const columns = [
  {
    name: "eleccion",
    align: "center",
    label: "Tipo de elección",
    field: "eleccion",
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
    name: "voto_Valido_Comun_RP",
    align: "center",
    label: "Voto valido RP",
    field: "voto_Valido_Comun_RP",
    sortable: true,
  },
  {
    name: "rp",
    align: "center",
    label: "RP",
    field: "rp",
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
  await comunesRegistradasStore.loadComunRegistrada(id);
  comunesRegistradasStore.updateEditar(true);
  comunesRegistradasStore.actualizarModal(true);
  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar",
    message: "¿Está seguro de eliminar?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, eliminar",
    },
    cancel: {
      color: "red",
      label: " No Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await comunesRegistradasStore.deleteComunRP(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      await comunesRegistradasStore.loadComunesRegistradas();
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
