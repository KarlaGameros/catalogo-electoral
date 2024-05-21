<template>
  <q-dialog
    v-model="modalIntegracion"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Agregar integración</div>
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

      <q-form class="q-col-gutter-xs" @submit="onSubmit">
        <q-card-section class="row q-pl-md">
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-sm">
            <q-select
              v-model.trim="partido_Id"
              :options="list_Partidos_Politicos"
              label="Seleccione un actor político"
              hint="Seleccione un actor político"
              lazy-rules
              :rules="[(val) => !!val || 'El actor político es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 q-pr-sm">
            <q-input
              v-model.trim="porcentaje"
              label="Porcentaje"
              hint="Ingrese porcentaje"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El porcentaje es requerido']"
            >
            </q-input>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-md">
          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="red"
                @click="actualizarModal(false)"
              />
              <q-btn
                label="Agregar"
                type="submit"
                color="secondary"
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-md">
          <q-table
            :rows="list_Partidos_Comun"
            :columns="columns"
            row-key="name"
            :pagination="pagination"
            class="my-sticky-last-column-table"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'id'">
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
                  <div v-else-if="col.name === 'porcentaje'">
                    {{ col.value }}%
                  </div>
                  <label v-else>{{ col.value }}</label>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { usePartidosPoliticosStore } from "src/stores/partidos-politicos-store";
import { onBeforeMount, ref } from "vue";

//-----------------------------------------------------------

const $q = useQuasar();
const partidosPoliticosStore = usePartidosPoliticosStore();
const {
  list_Partidos_Politicos,
  modalIntegracion,
  comun,
  partido,
  list_Partidos_Comun,
} = storeToRefs(partidosPoliticosStore);
const partido_Id = ref(null);
const porcentaje = ref(null);

//-----------------------------------------------------------

onBeforeMount(() => {
  partidosPoliticosStore.loadPartidosPoliticos();
});

const actualizarModal = (valor) => {
  partidosPoliticosStore.actualizarModalIntegracion(valor);
};

const eliminar = async (id) => {
  $q.dialog({
    title: "Eliminar coalicón",
    message: "¿Está seguro de eliminar el partido?",
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
    const resp = await partidosPoliticosStore.deletePartidoComun(id);
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      partidosPoliticosStore.loadComun(partido.value.id);
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

const onSubmit = async () => {
  $q.loading.show();
  let resp = null;
  comun.value.partido_Id = partido_Id.value.value;
  comun.value.porcentaje = porcentaje.value;
  comun.value.partido_Padre_Id = partido.value.id;
  let filtro = list_Partidos_Comun.value.find(
    (x) => x.partido_Id == partido_Id.value.value
  );
  if (filtro == undefined) {
    resp = await partidosPoliticosStore.createIntegracionComun(
      partido.value.id,
      comun.value
    );
    if (resp.success) {
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      await partidosPoliticosStore.loadComun(partido.value.id);
      partido_Id.value = null;
      porcentaje.value = null;
    } else {
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
    }
  } else {
    $q.dialog({
      title: "Atención",
      message: "El partido ya se agrego",
      icon: "Warning",
      persistent: true,
      transitionShow: "scale",
      transitionHide: "scale",
    });
  }

  $q.loading.hide();
};

const columns = [
  {
    name: "partido",
    align: "center",
    label: "Partido",
    field: "partido",
    sortable: true,
  },
  {
    name: "porcentaje",
    align: "center",
    label: "Porcentaje",
    field: "porcentaje",
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

const pagination = ref({
  page: 1,
  rowsPerPage: 5,
});
</script>
