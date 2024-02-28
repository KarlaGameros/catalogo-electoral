<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Grupos_Indigenas"
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
                <q-tooltip>Editar pais</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="pink"
                icon="delete"
                @click="eliminar(col.value)"
              >
                <q-tooltip>Eliminar pais</q-tooltip>
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
import { usePaisesPueblosStore } from "../../../stores/paises-pueblos-store";
//-------------------------------------------------------------------

const $q = useQuasar();
const paisesPueblosStore = usePaisesPueblosStore();
const { list_Grupos_Indigenas } = storeToRefs(paisesPueblosStore);

//-------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//-------------------------------------------------------------------

const cargarData = () => {
  $q.loading.show();
  paisesPueblosStore.loadGrupos();
  $q.loading.hide();
};

const columns = [
  {
    name: "grupo",
    align: "center",
    label: "Nombre",
    field: "grupo",
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
  await paisesPueblosStore.loadGrupo(id);
  paisesPueblosStore.updateEditar(true);
  paisesPueblosStore.actualizarModalGrupo(true);
  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar grupo indigena",
    message: "¿Está seguro de eliminar el grupo indigena?",
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
    const resp = await paisesPueblosStore.deleteGrupo(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      paisesPueblosStore.loadGrupos();
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
