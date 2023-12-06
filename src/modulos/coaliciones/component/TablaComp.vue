<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Coaliciones"
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
                icon="add_circle"
                @click="agregarIntegracion(col.value)"
              >
                <q-tooltip>Agregar integracón</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="pink"
                icon="change_circle"
                @click="combinaciones(col.value)"
              >
                <q-tooltip>Combinaciones</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="pink"
                icon="edit"
                @click="editar(col.value)"
              >
                <q-tooltip>Editar coalición</q-tooltip>
              </q-btn>
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
            <div v-else-if="col.name === 'logo_URL'">
              <q-avatar v-if="props.row.logo_URL != null">
                <img :src="props.row.logo_URL" alt="" />
              </q-avatar>
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
import { useCoalicionesStore } from "../../../stores/coaliciones-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const coalicionesStore = useCoalicionesStore();
const { list_Coaliciones } = storeToRefs(coalicionesStore);

//-------------------------------------------------------------------

onBeforeMount(() => {
  coalicionesStore.loadCoaliciones();
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
    name: "logo_URL",
    align: "center",
    label: "Logo",
    field: "logo_URL",
    sortable: true,
  },
  {
    name: "orden",
    align: "center",
    label: "Orden",
    field: "orden",
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

//-------------------------------------------------------------------

const agregarIntegracion = async (id) => {
  $q.loading.show();
  coalicionesStore.actualizarModalIntegracion(true);
  await coalicionesStore.loadCoalicion(id);
  await coalicionesStore.loadIntegracionesByCoalicion(id);
  $q.loading.hide();
};

const editar = async (id) => {
  $q.loading.show();
  await coalicionesStore.loadCoalicion(id);
  coalicionesStore.updateEditar(true);
  coalicionesStore.actualizarModal(true);
  $q.loading.hide();
};

const combinaciones = async (id) => {
  $q.loading.show();
  let resp = await coalicionesStore.getCombinaciones(id);
  if (resp == false) {
    $q.dialog({
      title: "No hay combinaciones de la coalición",
      message: "¿Desea generar las combinaciones?",
      icon: "Warning",
      persistent: true,
      transitionShow: "scale",
      transitionHide: "scale",
      ok: {
        color: "positive",
        label: "¡Sí!, generar",
      },
      cancel: {
        color: "negative",
        label: " No Cancelar",
      },
    }).onOk(async () => {
      $q.loading.show();
      const resp = await coalicionesStore.generarCombinaciones(id);
      if (resp.success) {
        $q.loading.hide();
        $q.notify({
          position: "top-right",
          type: "positive",
          message: resp.data,
        });
        //coalicionesStore.loadCoaliciones();
      } else {
        $q.loading.hide();
        $q.notify({
          position: "top-right",
          type: "negative",
          message: resp.data,
        });
      }
    });
  } else {
    await coalicionesStore.loadCoalicion(id);
    await coalicionesStore.getCombinaciones(id);
    coalicionesStore.actualizarModalCombinaciones(true);
  }
  $q.loading.hide();
};

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
    const resp = await coalicionesStore.deleteCoalicion(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      coalicionesStore.loadCoaliciones();
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
