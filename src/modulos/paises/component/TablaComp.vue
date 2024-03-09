<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Paises"
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
                v-if="modulo == null ? false : modulo.eliminar"
                flat
                round
                color="pink"
                icon="edit"
                @click="editar(col.value)"
              >
                <q-tooltip>Editar pais</q-tooltip>
              </q-btn>
              <q-btn
                v-if="modulo == null ? false : modulo.eliminar"
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
import { useAuthStore } from "src/stores/auth-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const paisesPueblosStore = usePaisesPueblosStore();
const { list_Paises } = storeToRefs(paisesPueblosStore);
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SCE-CAT-PA";

//-------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
  leerPermisos();
});

//--------------------------------------------------------------------

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const cargarData = () => {
  $q.loading.show();
  paisesPueblosStore.loadPaises();
  $q.loading.hide();
};

const columns = [
  {
    name: "pais",
    align: "center",
    label: "Nombre",
    field: "pais",
    sortable: true,
  },
  {
    name: "clave",
    align: "center",
    label: "Siglas",
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
  await paisesPueblosStore.loadPais(id);
  paisesPueblosStore.updateEditar(true);
  paisesPueblosStore.actualizarModal(true);
  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar pais",
    message: "¿Está seguro de eliminar el pais?",
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
    const resp = await paisesPueblosStore.deletePais(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      paisesPueblosStore.loadPaises();
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
