<template>
  <div class="q-pt-lg">
    <q-table
      :rows="list_Requisitos"
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
            <div v-if="col.name === 'archivo'">
              <q-btn
                flat
                round
                :color="props.row.archivo == true ? 'green' : 'red'"
                :icon="props.row.archivo == true ? 'done' : 'close'"
              >
              </q-btn>
            </div>
            <div v-else-if="col.name === 'genero'">
              <q-btn
                flat
                round
                :color="props.row.genero == true ? 'green' : 'red'"
                :icon="props.row.genero == true ? 'done' : 'close'"
              >
              </q-btn>
            </div>
            <div v-else-if="col.name === 'activo'">
              <q-btn
                flat
                round
                :color="props.row.activo == true ? 'green' : 'red'"
                :icon="props.row.activo == true ? 'done' : 'close'"
              >
              </q-btn>
            </div>
            <div v-else-if="col.name === 'id'">
              <q-btn
                @click="editar(col.value)"
                flat
                round
                color="pink"
                icon="edit"
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

const editar = async (id) => {
  $q.loading.show();
  await eleccionesStore.loadRequerimientoById(id);
  eleccionesStore.updateEditar(true);
  //await eleccionesStore.updateRequisitosEleccion(id);
  $q.loading.hide();
};

//-------------------------------------------------------------------
</script>

<style></style>
