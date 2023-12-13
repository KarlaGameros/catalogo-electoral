<template>
  <div class="q-pt-lg">
    <q-table
      :rows="list_Requisitos"
      :columns="columns"
      row-key="name"
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
            <div v-if="col.name === 'id'"></div>

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
import { useTipoEleccionesStore } from "../../../stores/tipo-elecciones";

//-------------------------------------------------------------------

const $q = useQuasar();
const eleccionesStore = useTipoEleccionesStore();
const { list_Requisitos } = storeToRefs(eleccionesStore);

//-------------------------------------------------------------------

onBeforeMount(() => {
  eleccionesStore.loadTiposEleeciones();
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
    name: "archivo",
    align: "center",
    label: "Archivo",
    field: "archivo",
    sortable: true,
  },
  {
    name: "genero",
    align: "center",
    label: "Género",
    field: "genero",
    sortable: true,
  },
  {
    name: "activo",
    align: "center",
    label: "Activo",
    field: "activo",
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

<style></style>
