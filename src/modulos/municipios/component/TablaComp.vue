<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Municipios"
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
            <label>{{ col.value }}</label>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useMunicipiosStore } from "../../../stores/municipios-store";

//-------------------------------------------------------------------

const municipioStore = useMunicipiosStore();
const { list_Municipios } = storeToRefs(municipioStore);

//-------------------------------------------------------------------

onBeforeMount(() => {
  municipioStore.loadMunicipios();
});

//-------------------------------------------------------------------

const columns = [
  {
    name: "estado",
    align: "center",
    label: "Estado",
    field: "estado",
    sortable: true,
  },
  {
    name: "clave",
    align: "center",
    label: "Clave",
    field: "clave",
    sortable: true,
  },
  {
    name: "nombre",
    align: "center",
    label: "Municipio",
    field: "nombre",
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
</script>

<style></style>
