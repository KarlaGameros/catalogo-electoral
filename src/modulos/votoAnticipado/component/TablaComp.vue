<template>
  <div class="q-pa-md">
    <q-table
      :rows="list_Voto_Anticipado"
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
                <q-tooltip>Editar </q-tooltip>
              </q-btn>
            </div>
            <div v-else-if="col.name === 'computado'">
              <q-icon
                size="sm"
                flat
                round
                :color="col.value == true ? 'green' : 'red'"
                :name="col.value == true ? 'done' : 'close'"
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
import { useAuthStore } from "src/stores/auth-store";
import { useVotoAnticipado } from "src/stores/voto-anticipado";
import { onBeforeMount, ref } from "vue";

//-------------------------------------------------------------------

const $q = useQuasar();
const authStore = useAuthStore();
const votoanticipadoStore = useVotoAnticipado();
const { modulo } = storeToRefs(authStore);
const { list_Voto_Anticipado } = storeToRefs(votoanticipadoStore);
const siglas = "SCE-TIP-EL";

//-------------------------------------------------------------------

onBeforeMount(() => {
  cargarData();
  leerPermisos();
});

//-------------------------------------------------------------------

const cargarData = async () => {
  await votoanticipadoStore.loadVotoAnticipado();
};

const leerPermisos = async () => {
  $q.loading.show();
  await authStore.loadModulo(siglas);
  $q.loading.hide();
};

const columns = [
  {
    name: "usuario",
    align: "center",
    label: "Usuario",
    field: "usuario",
    sortable: true,
  },
  {
    name: "tipo_Eleccion",
    align: "center",
    label: "Tipo de elección",
    field: "tipo_Eleccion",
    sortable: true,
  },
  {
    name: "distrito",
    align: "center",
    label: "Distrito",
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
    name: "listado_Nominal",
    align: "center",
    label: "Listado nominal",
    field: "listado_Nominal",
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
  await votoanticipadoStore.loadVoto(id);
  votoanticipadoStore.updateEditar(true);
  votoanticipadoStore.actualizarModal(true);
  $q.loading.hide();
};
</script>
