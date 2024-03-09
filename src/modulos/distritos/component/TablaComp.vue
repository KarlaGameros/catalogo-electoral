<template>
  <div class="q-pa-md">
    <q-table
      :grid="$q.screen.xs"
      :rows="list_Distritos"
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
      <template v-if="$q.screen.xs" v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        >
          <q-card bordered class="no-shadow">
            <q-item>
              <q-item-section>
                <q-item-label class="text-grey-8 text-weight-bold">
                  Número de distrito: {{ props.row.no_Distrito }}
                </q-item-label>
                <q-item-label class="text-grey-8 text-weight-bold">
                  Nombre: {{ props.row.nombre }}
                </q-item-label>
                <q-item-label class="text-grey-8 text-weight-bold">
                  Integración: {{ props.row.integracion }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>
                  <q-btn
                    flat
                    round
                    color="pink-5"
                    icon="edit_square"
                    @click="editar(props.row.id)"
                  >
                    <q-tooltip>Editar información</q-tooltip>
                  </q-btn>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator></q-separator>
          </q-card>
        </div>
      </template>
      <template v-else v-slot:body="props">
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
                <q-tooltip>Editar distrito</q-tooltip>
              </q-btn>
              <q-btn
                v-if="modulo == null ? false : modulo.eliminar"
                flat
                round
                color="pink"
                icon="delete"
                @click="eliminar(col.value)"
              >
                <q-tooltip>eliminar distrito</q-tooltip>
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
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useDistritosStore } from "../../../stores/distritos-store";
import { useAuthStore } from "src/stores/auth-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const authStore = useAuthStore();
const distritosStore = useDistritosStore();
const { list_Distritos } = storeToRefs(distritosStore);
const { modulo } = storeToRefs(authStore);
const siglas = "SCE-CAT-DI";

//-------------------------------------------------------------------

onBeforeMount(() => {
  distritosStore.loadDistritos();
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
    name: "no_Distrito",
    align: "center",
    label: "Número de distrito",
    field: "no_Distrito",
    sortable: true,
  },
  {
    name: "nombre",
    align: "center",
    label: "Nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "integracion",
    align: "center",
    label: "Integración",
    field: "integracion",
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
  await distritosStore.loadDistrito(id);
  distritosStore.updateEditar(true);
  distritosStore.actualizarModal(true);
  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar distrito",
    message: "¿Está seguro de eliminar el distrito?",
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
    const resp = await distritosStore.deleteDistrito(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      distritosStore.loadDistritos();
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
