<template>
  <div class="q-pa-md">
    <q-table
      :rows="pregunta.opciones"
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
            <div v-if="col.name === 'otro'">
              <q-btn
                flat
                round
                :color="props.row.otro == true ? 'green' : 'red'"
                :icon="props.row.otro == true ? 'done' : 'close'"
              >
              </q-btn>
            </div>
            <div v-else-if="col.name === 'id'">
              <q-btn
                @click="editarOpcion(col.value, props.row.pregunta_Id)"
                flat
                round
                color="pink"
                icon="edit"
                ><q-tooltip>Editar opción</q-tooltip>
              </q-btn>
              <q-btn
                @click="deleteOpcion(col.value, props.row.pregunta_Id)"
                flat
                round
                color="pink"
                icon="cancel"
                ><q-tooltip>Eliminar opción</q-tooltip>
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
import { useQuasar } from "quasar";

//-------------------------------------------------------------------

const $q = useQuasar();
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

const deleteOpcion = async (id, pregunta_Id) => {
  $q.dialog({
    title: "Eliminar opción",
    message: "¿Está seguro de eliminar la opción?",
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
    const resp = await conocelesStore.deleteOpcion(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      conocelesStore.loadRespuestas(pregunta_Id);
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

const editarOpcion = async (id) => {
  $q.loading.show();
  await conocelesStore.loadOpcion(id);
  $q.loading.hide();
};

//-------------------------------------------------------------------
</script>

<style></style>
