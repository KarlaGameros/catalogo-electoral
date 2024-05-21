<template>
  <q-table
    :rows="list_Integracion"
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
              icon="delete"
              @click="eliminar(col.value)"
            >
              <q-tooltip>Eliminar coalición</q-tooltip>
            </q-btn>
          </div>
          <div v-else-if="col.name === 'porcentaje'">{{ col.value }}%</div>
          <label v-else>{{ col.value }}</label>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { ref, watch } from "vue";
import { useCoalicionesStore } from "../../../stores/coaliciones-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const coalicionesStore = useCoalicionesStore();
const { list_Integracion, coalicion } = storeToRefs(coalicionesStore);

//-------------------------------------------------------------------

const columns = [
  {
    name: "partido",
    align: "center",
    label: "Partido",
    field: "partido",
    sortable: true,
  },
  {
    name: "porcentaje",
    align: "center",
    label: "Porcentaje",
    field: "porcentaje",
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

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar coalicón",
    message: "¿Está seguro de eliminar la coalición?",
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
    const resp = await coalicionesStore.deleteIntegracion(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      coalicionesStore.loadIntegracionesByCoalicion(coalicion.value.id);
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
