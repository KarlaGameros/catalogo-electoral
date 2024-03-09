<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Rubros_Evaluacion"
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
                v-if="modulo == null ? false : modulo.actualizar"
                flat
                round
                color="pink"
                icon="edit"
                @click="editar(col.value)"
              >
                <q-tooltip>Editar partido político</q-tooltip>
              </q-btn>
              <q-btn
                v-if="modulo == null ? false : modulo.eliminar"
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
import { useAuthStore } from "src/stores/auth-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const conocelesStore = useConocelesStore();
const { list_Rubros_Evaluacion } = storeToRefs(conocelesStore);
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SCE-RUB-EV";

//-------------------------------------------------------------------

onBeforeMount(() => {
  conocelesStore.loadRubrosEvaluacion();
  leerPermisos();
});

//--------------------------------------------------------------------

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const columns = [
  {
    name: "rubro",
    align: "center",
    label: "Rubro",
    field: "rubro",
    sortable: true,
  },
  {
    name: "puntuacion_Maxima",
    align: "center",
    label: "Puntuación maxima",
    field: "puntuacion_Maxima",
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
  await conocelesStore.loadRubroEvaluacion(id);
  await conocelesStore.loadVariablesByRubro(id);
  conocelesStore.updateEditar(true);
  conocelesStore.actualizarModalRubro(true);
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
      color: "secondary",
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
