<template>
  <div class="q-pa-md">
    <q-card>
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="blue-grey"
        indicator-color="blue-grey"
        align="justify"
      >
        <q-tab
          v-for="eleccion in list_Tipos_Elecciones"
          :key="eleccion"
          :name="eleccion.siglas"
          :label="eleccion.nombre"
          @click="setEleccion(eleccion)"
        />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel :name="tab">
          <q-table
            :loading="loading"
            :visible-columns="visible_columns"
            :rows="list_Modelos"
            :columns="columns"
            :filter="filter"
            row-key="name"
            v-model:pagination="pagination"
            color="pink"
          >
            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="filter"
                placeholder="Buscar"
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
                    <!-- v-if="modulo == null ? false : modulo.registrar" -->
                    <q-btn
                      flat
                      round
                      color="pink"
                      icon="edit_square"
                      @click="editar(col.value)"
                    >
                      <q-tooltip>Capturar</q-tooltip>
                    </q-btn>
                  </div>
                  <div v-else-if="col.name === 'estatal'">
                    <q-icon
                      size="md"
                      :name="!col.value ? 'cancel' : 'check_circle'"
                      :color="!col.value ? 'red' : 'green'"
                    />
                  </div>
                  <label v-else>{{ col.value }}</label>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useModelosStore } from "../../../stores/modelos-store";
import { useAuthStore } from "src/stores/auth-store";
import { useTipoEleccionesStore } from "src/stores/tipo-elecciones";

//-------------------------------------------------------------------

const $q = useQuasar();
const modelosStore = useModelosStore();
const eleccionesStore = useTipoEleccionesStore();
const { list_Tipos_Elecciones } = storeToRefs(eleccionesStore);
const { list_Modelos, loading } = storeToRefs(modelosStore);
const tab = ref(null);
const eleccion_Id = ref(null);
const visible_columns = ref([
  "id",
  "distrito",
  "municipio",
  "demarcacion",
  "ruta",
  "estatal",
]);

//-------------------------------------------------------------------

onBeforeMount(() => {
  leerPermisos();
  cargarData();
});

//-------------------------------------------------------------------

const cargarData = async () => {
  await eleccionesStore.loadTiposEleeciones();
  eleccion_Id.value = list_Tipos_Elecciones.value[0].id;
  tab.value = list_Tipos_Elecciones.value[0].siglas;
  await modelosStore.loadModelos(eleccion_Id.value);
  setEleccion(list_Tipos_Elecciones.value[0]);
};

const leerPermisos = async () => {
  $q.loading.show();

  $q.loading.hide();
};

const setEleccion = async (eleccion) => {
  await modelosStore.loadModelos(eleccion.id);
  if (eleccion.siglas == "DIP") {
    visible_columns.value = ["id", "distrito", "ruta", "estatal"];
  } else if (eleccion.siglas == "PYS") {
    visible_columns.value = ["id", "municipio", "ruta", "estatal"];
  } else if (eleccion.siglas == "REG") {
    visible_columns.value = [
      "id",
      "municipio",
      "demarcacion",
      "ruta",
      "estatal",
    ];
  } else {
    visible_columns.value = ["id", "municipio", "ruta", "estatal"];
  }
};

const columns = [
  {
    name: "distrito",
    align: "center",
    label: "Número de distrito",
    field: "distrito",
    sortable: true,
  },
  {
    name: "municipio",
    align: "center",
    label: "Municipio",
    field: "municipio",
    sortable: true,
  },
  {
    name: "demarcacion",
    align: "center",
    label: "Demarcación",
    field: "demarcacion",
    sortable: true,
  },
  {
    name: "ruta",
    align: "center",
    label: "Ruta",
    field: "ruta",
    sortable: true,
  },
  {
    name: "estatal",
    align: "center",
    label: "Estatal",
    field: "estatal",
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
  await modelosStore.loadModelo(id);
  modelosStore.updateEditar(true);
  modelosStore.actualizarModal(true);
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
