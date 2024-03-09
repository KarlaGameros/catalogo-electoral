<template>
  <div class="q-pa-md">
    <q-table
      :visible-columns="visible_columns"
      :rows="list_Preguntas_Identidad"
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
                <q-tooltip>Editar pregunta</q-tooltip>
              </q-btn>
              <q-btn
                v-if="modulo == null ? false : modulo.eliminar"
                flat
                round
                color="pink"
                icon="delete"
                @click="eliminar(col.value)"
              >
                <q-tooltip>Eliminar pregunta</q-tooltip>
              </q-btn>
              <q-btn
                v-if="modulo == null ? false : modulo.registrar"
                flat
                round
                color="pink"
                icon="list"
                @click="subOpciones(col.value)"
              >
                <q-tooltip>Agregar sub opción</q-tooltip>
              </q-btn>
            </div>
            <div v-else-if="col.name == 'pregunta'">
              <label>{{ col.value }}</label>
              <q-tooltip
                :offset="[10, 10]"
                v-if="col.value.length != props.row['pregunta_Completa'].length"
                >{{ props.row["pregunta_Completa"] }}</q-tooltip
              >
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
const { list_Preguntas_Identidad } = storeToRefs(conocelesStore);
const authStore = useAuthStore();
const { modulo } = storeToRefs(authStore);
const siglas = "SCE-PRE-ID";

//-------------------------------------------------------------------

onBeforeMount(() => {
  conocelesStore.loadPreguntasIdentidad();
  leerPermisos();
});

//-------------------------------------------------------------------

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

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
    name: "pregunta_Completa",
    align: "center",
    label: "Pregunta",
    field: "pregunta_Completa",
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

const visible_columns = ["numero", "pregunta", "tipo", "apartado", "id"];

const filter = ref("");

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 5,
});

//-------------------------------------------------------------------

const subOpciones = async (id) => {
  $q.loading.show();
  await conocelesStore.loadRespuestas(id);
  await conocelesStore.loadPregunta(id);
  conocelesStore.actualizarModalSubOpcion(true);
  $q.loading.hide();
};

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
