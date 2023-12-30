<template>
  <div class="q-pa-md">
    <q-table
      :rows="pregunta.opciones"
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
            <div v-if="col.name === 'otro'">
              <q-btn
                flat
                round
                :color="props.row.otro == true ? 'green' : 'red'"
                :icon="props.row.otro == true ? 'done' : 'close'"
              >
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
import { ref } from "vue";
import { useConocelesStore } from "src/stores/conoceles-store";

//-------------------------------------------------------------------

const conocelesStore = useConocelesStore();
const { pregunta } = storeToRefs(conocelesStore);

//-------------------------------------------------------------------

const columns = [
  {
    name: "opcion",
    align: "center",
    label: "Opción",
    field: "opcion",
    sortable: true,
  },
  {
    name: "otro",
    align: "center",
    label: "Otro",
    field: "otro",
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
