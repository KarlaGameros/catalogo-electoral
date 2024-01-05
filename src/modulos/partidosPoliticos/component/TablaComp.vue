<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Partidos_Politicos"
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
                <q-tooltip>Editar partido político</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="pink"
                icon="delete"
                @click="eliminar(col.value)"
              >
                <q-tooltip>Eliminar partido político</q-tooltip>
              </q-btn>
            </div>
            <div v-else-if="col.name === 'logo_URL'">
              <q-avatar v-if="props.row.logo_URL != null">
                <img :src="props.row.logo_URL" alt="" />
              </q-avatar>
            </div>
            <div v-else-if="col.name === 'independiente'">
              <q-btn
                flat
                round
                :color="props.row.independiente == true ? 'green' : 'red'"
                :icon="props.row.independiente == true ? 'done' : 'close'"
              >
              </q-btn>
            </div>
            <div v-else-if="col.name === 'pantone_Fondo'">
              <q-btn
                v-if="props.row.pantone_Fondo != null"
                flat
                round
                :style="{ background: props.row.pantone_Fondo }"
              >
                <q-tooltip>{{ props.row.pantone_Fondo }}</q-tooltip>
              </q-btn>
            </div>
            <div v-else-if="col.name === 'pantone_Letra'">
              <q-btn
                v-if="props.row.pantone_Letra != null"
                flat
                round
                :style="{ background: props.row.pantone_Letra }"
              >
                <q-tooltip>{{ props.row.pantone_Letra }}</q-tooltip>
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
import { onBeforeMount, ref } from "vue";
import { usePartidosPoliticosStore } from "../../../stores/partidos-politicos-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const partidosStore = usePartidosPoliticosStore();
const { list_Partidos_Politicos } = storeToRefs(partidosStore);

//-------------------------------------------------------------------

onBeforeMount(() => {
  partidosStore.loadPartidosPoliticos();
});

//-------------------------------------------------------------------

const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "siglas",
    align: "center",
    label: "Siglas",
    field: "siglas",
    sortable: true,
  },
  {
    name: "logo_URL",
    align: "center",
    label: "Logo",
    field: "logo_URL",
    sortable: true,
  },
  {
    name: "independiente",
    align: "center",
    label: "Independiente",
    field: "independiente",
    sortable: true,
  },
  {
    name: "prioridad",
    align: "center",
    label: "Prioridad",
    field: "prioridad",
    sortable: true,
  },
  {
    name: "pantone_Fondo",
    align: "center",
    label: "Pantone fondo",
    field: "pantone_Fondo",
    sortable: true,
  },
  {
    name: "pantone_Letra",
    align: "center",
    label: "Pantone letra",
    field: "pantone_Letra",
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
  await partidosStore.loadPartdio(id);
  partidosStore.updateEditar(true);
  partidosStore.actualizarModal(true);
  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar partido politico",
    message: "¿Está seguro de eliminar el partido politico?",
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
    const resp = await partidosStore.deletePartido(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      partidosStore.loadPartidosPoliticos();
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

<style></style>
