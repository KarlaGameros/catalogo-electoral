<template>
  <div class="q-pa-md">
    <q-table
      :visible-columns="visible_columns"
      :rows="rubro.variables"
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
              <!-- <q-btn
                flat
                round
                color="pink"
                icon="delete"
                @click="eliminar(col.value)"
              >
                <q-tooltip>Eliminar</q-tooltip>
              </q-btn> -->
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
import { ref } from "vue";
import { useConocelesStore } from "src/stores/conoceles-store";

//-------------------------------------------------------------------

const conocelesStore = useConocelesStore();
const { rubro } = storeToRefs(conocelesStore);

//-------------------------------------------------------------------

const columns = [
  {
    name: "id",
    align: "center",
    label: "Acciones",
    field: "id",
    sortable: true,
  },
  {
    name: "variable",
    align: "center",
    label: "Variable",
    field: "variable",
    sortable: true,
  },
  {
    name: "tipo",
    align: "center",
    label: "Tipo",
    field: "tipo",
    sortable: true,
  },
  {
    name: "descripcion",
    align: "center",
    label: "Descripción",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "cumple",
    align: "center",
    label: "Cumple",
    field: "cumple",
    sortable: true,
  },
  {
    name: "no_Cumple",
    align: "center",
    label: "No cumple",
    field: "no_Cumple",
    sortable: true,
  },
];

const visible_columns = [
  "id",
  "variable",
  "tipo",
  "descripcion",
  "cumple",
  "no_Cumple",
];

const filter = ref("");

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 5,
});

const eliminar = async (id) => {
  await conocelesStore.deleteVariable(id);
};

const editar = async (id) => {
  await conocelesStore.loadVariableById(id);
  conocelesStore.updateEditarVariable(true);
};
//-------------------------------------------------------------------
</script>

<style></style>
