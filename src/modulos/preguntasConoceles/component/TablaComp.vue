<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Preguntas_Identidad"
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
import { useConocelesStore } from "src/stores/conoceles-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const conocelesStore = useConocelesStore();
const { list_Preguntas_Identidad } = storeToRefs(conocelesStore);

//-------------------------------------------------------------------

onBeforeMount(() => {
  conocelesStore.loadPreguntasIdentidad();
});

//-------------------------------------------------------------------

const columns = [
  {
    name: "numero",
    align: "center",
    label: "Número",
    field: "numero",
    sortable: true,
  },
  {
    name: "pregunta",
    align: "center",
    label: "Pregunta",
    field: "pregunta",
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
    name: "apartado",
    align: "center",
    label: "Apartado",
    field: "apartado",
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
  await conocelesStore.loadRespuestas(id);
  await conocelesStore.loadPregunta(id);
  conocelesStore.updateEditar(true);
  conocelesStore.actualizarModal(true);
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
    const resp = await conocelesStore.deletePregunta(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      conocelesStore.loadRespuestas();
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
