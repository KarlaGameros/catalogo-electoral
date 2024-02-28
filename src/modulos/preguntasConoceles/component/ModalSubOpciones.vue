<template>
  <q-dialog
    v-model="modalSubOpcion"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Agregar Sub Opciones</div>
        <q-space />
        <q-btn
          icon="close"
          @click="actualizarModal(false)"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section>
        <q-form class="row q-col-gutter-xs" @submit="onSubmit">
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 q-pr-xs">
            <q-select
              v-model="opcion_Id"
              :options="pregunta.opciones"
              label="Opción"
              lazy-rules
              :rules="[(val) => !!val || 'La opción es requerida']"
            />
          </div>
          <div
            v-if="opcion_Id != null"
            class="col-lg-4 col-md-4 col-sm-4 col-xs-12"
          >
            <q-input
              v-model="subOpcion.sub_Opcion"
              label="Sub opción"
              hint="Ingrese sub opción"
              lazy-rules
              :rules="[(val) => !!val || 'Es requerido']"
            >
            </q-input>
          </div>
          <div v-if="opcion_Id != null" class="col-12 justify-end q-pb-md">
            <div class="text-right q-gutter-xs">
              <q-btn
                icon="add"
                label="Agregar"
                type="submit"
                color="secondary"
                class="q-ml-sm"
              />
            </div>
          </div>
          <div class="col-12 q-pb-md">
            <q-table
              :rows="list_Sub_Opciones"
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
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <div v-if="col.name === 'otro'">
                      <q-btn
                        flat
                        round
                        :color="props.row.otro == true ? 'green' : 'red'"
                        :icon="props.row.otro == true ? 'done' : 'close'"
                      >
                      </q-btn>
                    </div>
                    <div v-else-if="col.name === 'id'">
                      <q-btn
                        @click="editarOpcion(col.value, props.row.pregunta_Id)"
                        flat
                        round
                        color="pink"
                        icon="edit"
                        ><q-tooltip>Editar opción</q-tooltip>
                      </q-btn>
                      <q-btn
                        @click="deleteOpcion(col.value, props.row.pregunta_Id)"
                        flat
                        round
                        color="pink"
                        icon="cancel"
                        ><q-tooltip>Eliminar opción</q-tooltip>
                      </q-btn>
                    </div>
                    <label v-else>{{ col.value }}</label>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="red"
                @click="actualizarModal(false)"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useConocelesStore } from "src/stores/conoceles-store";
import { ref, watch } from "vue";

//-----------------------------------------------------------

const $q = useQuasar();
const conocelesStore = useConocelesStore();
const { modalSubOpcion, subOpcion, isEditar, pregunta, list_Sub_Opciones } =
  storeToRefs(conocelesStore);
const opcion_Id = ref(null);

//-----------------------------------------------------------

watch(opcion_Id, (val) => {
  if (val != null) {
    conocelesStore.loadSubopcionesByOpcion(val.value);
  }
});

const columns = [
  {
    name: "sub_Opcion",
    align: "center",
    label: "Sub opción",
    field: "sub_Opcion",
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

const actualizarModal = (valor) => {
  $q.loading.show();
  conocelesStore.actualizarModalSubOpcion(valor);
  conocelesStore.initSubOpcion();
  list_Sub_Opciones.value = [];
  opcion_Id.value = null;
  $q.loading.hide();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
  } else {
    subOpcion.value.opcion_Id = opcion_Id.value.value;
    resp = await conocelesStore.createSubOpcion(subOpcion.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    conocelesStore.initSubOpcion();
    conocelesStore.loadSubopcionesByOpcion(opcion_Id.value.value);
  } else {
    $q.notify({
      position: "top-right",
      type: "negative",
      message: resp.data,
    });
  }
  $q.loading.hide();
};
</script>

<style></style>
