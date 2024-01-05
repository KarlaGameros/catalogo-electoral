<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Tipos_Elecciones"
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
                icon="checklist"
                @click="addRequisitos(col.value)"
              >
                <q-tooltip>Requisitos de la elección</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="pink"
                icon="edit"
                @click="editar(col.value)"
              >
                <q-tooltip>Editar elección</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="pink"
                icon="delete"
                @click="eliminar(col.value)"
              >
                <q-tooltip>Eliminar elección</q-tooltip>
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
const { list_Tipos_Elecciones } = storeToRefs(eleccionesStore);

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
    name: "siglas",
    align: "center",
    label: "Siglas",
    field: "siglas",
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
    name: "fecha_Registro",
    align: "center",
    label: "Fecha de registro",
    field: "fecha_Registro",
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

const addRequisitos = async (id) => {
  $q.loading.show();
  eleccionesStore.actualizarModalRequisitos(true);
  await eleccionesStore.loadTipoEleccion(id);
  await eleccionesStore.loadRequisitos(id);
  $q.loading.hide();
};

const editar = async (id) => {
  $q.loading.show();
  await eleccionesStore.loadTipoEleccion(id);
  eleccionesStore.updateEditar(true);
  eleccionesStore.actualizarModal(true);
  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar elección",
    message: "¿Está seguro de eliminar el tipo de elección?",
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
    const resp = await eleccionesStore.deleteEleccion(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      eleccionesStore.loadTiposEleeciones();
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
