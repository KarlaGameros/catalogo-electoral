<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Casillas_Filtrado"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :pagination="pagination"
      class="my-sticky-last-column-table"
    >
      <template v-slot:top-left>
        <q-select
          filled
          color="pink"
          class="q-pr-md"
          v-model="municipio_Id"
          :options="list_Municipios"
          label="Selecciona municipio"
          hint="Filtrar por municipio"
          style="width: 260px"
        />
      </template>
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
                <q-tooltip>Editar casilla</q-tooltip>
              </q-btn>
              <q-btn
                v-if="modulo == null ? false : modulo.eliminar"
                flat
                round
                color="pink"
                icon="delete"
                @click="eliminar(col.value)"
              >
                <q-tooltip>Eliminar casilla</q-tooltip>
              </q-btn>
            </div>
            <div v-else-if="col.name === 'activo'">
              <q-icon
                size="sm"
                :color="props.row.activo == true ? 'green' : 'red'"
                :name="props.row.activo == true ? 'done' : 'close'"
              />
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
import { onBeforeMount, ref, watchEffect } from "vue";
import { useCasillasStore } from "../../../stores/casillas-store";
import { useAuthStore } from "../../../stores/auth-store";
import { useMunicipiosStore } from "src/stores/municipios-store";

//-------------------------------------------------------------------

const $q = useQuasar();
const authStore = useAuthStore();
const casillasStore = useCasillasStore();
const municipiosStore = useMunicipiosStore();
const { list_Casillas } = storeToRefs(casillasStore);
const { list_Municipios } = storeToRefs(municipiosStore);
const { modulo } = storeToRefs(authStore);
const siglas = "SCE-CAT-CA";
const municipio_Id = ref(null);
const list_Casillas_Filtrado = ref([]);

//-------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
});

//-------------------------------------------------------------------

const cargarData = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  await casillasStore.loadCasillas();
  municipio_Id.value = { value: 0, label: "Todos" };
  $q.loading.hide();
};

const editar = async (id) => {
  $q.loading.show();
  await casillasStore.loadCasilla(id);
  casillasStore.updateEditar(true);
  casillasStore.actualizarModalCasilla(true);
  $q.loading.hide();
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar casilla",
    message: "¿Está seguro de eliminar la casilla?",
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
      label: "No, Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await casillasStore.deleteCasilla(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      casillasStore.loadCasillas();
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

//-------------------------------------------------------------------

const columns = [
  {
    name: "municipio",
    align: "center",
    label: "Municipio",
    field: "municipio",
    sortable: true,
  },
  {
    name: "seccion",
    align: "center",
    label: "Sección",
    field: "seccion",
    sortable: true,
  },
  {
    name: "tipo_Casilla",
    align: "center",
    label: "Tipo casilla",
    field: "tipo_Casilla",
    sortable: true,
  },
  {
    name: "no_Casilla",
    align: "center",
    label: "No. Casilla",
    field: "no_Casilla",
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
    name: "extension_Contigua",
    align: "center",
    label: "Extraordinaria contigua",
    field: "extension_Contigua",
    sortable: true,
  },
  {
    name: "listado_Nominal",
    align: "center",
    label: "Listado nominal",
    field: "listado_Nominal",
    sortable: true,
  },
  {
    name: "padron_Electoral",
    align: "center",
    label: "Padrón electoral",
    field: "padron_Electoral",
    sortable: true,
  },
  {
    name: "boletas_Entregadas",
    align: "center",
    label: "Boletas entregadas",
    field: "boletas_Entregadas",
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
    name: "tipo_Seccion",
    align: "center",
    label: "Tipo sección",
    field: "tipo_Seccion",
    sortable: true,
  },
  {
    name: "domicilio",
    align: "center",
    label: "Domicilio",
    field: "domicilio",
    sortable: true,
  },
  {
    name: "referencia",
    align: "center",
    label: "Referencia",
    field: "referencia",
    sortable: true,
  },
  {
    name: "tipo_Lugar",
    align: "center",
    label: "Tipo del lugar",
    field: "tipo_Lugar",
    sortable: true,
  },
  {
    name: "ubicacion",
    align: "center",
    label: "Ubicación",
    field: "ubicacion",
    sortable: true,
  },
  {
    name: "latitud_Cartografica",
    align: "center",
    label: "Latitud cartográfica",
    field: "latitud_Cartografica",
    sortable: true,
  },
  {
    name: "latitud_Google",
    align: "center",
    label: "Latitud Google",
    field: "latitud_Google",
    sortable: true,
  },
  {
    name: "longitud_Cartografica",
    align: "center",
    label: "Longitud cartográfica",
    field: "longitud_Cartografica",
    sortable: true,
  },
  {
    name: "longitud_Google",
    align: "center",
    label: "Longitud Google",
    field: "longitud_Google",
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

const filtrar = (list_Casillas, filtro) => {
  list_Casillas_Filtrado.value = list_Casillas.filter((item) => {
    let cumple = true;
    if (filtro.municipio !== undefined) {
      if (filtro.municipio == 0) {
        cumple = cumple && item.municipio_Id === item.municipio_Id;
      } else {
        cumple = cumple && item.municipio_Id === filtro.municipio;
      }
    }
    return cumple;
  });
};

watchEffect(() => {
  const filtro = {};
  if (municipio_Id.value != null) filtro.municipio = municipio_Id.value.value;
  filtrar(list_Casillas.value, filtro);
});
</script>

<style lang="sass">
.my-sticky-last-column-table
  thead tr:last-child th:last-child
    /* bg color is important for th; just specify one */
    background-color: white

  td:last-child
    background-color: white

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
