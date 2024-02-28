<template>
  <q-dialog
    v-model="modalCombinaciones"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Combinaciones</div>
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

      <q-form>
        <q-card-section>
          <q-card class="no-shadow" bordered>
            <q-card-section>
              <div class="text-h6 text-grey-8 text-center">
                {{ coalicion.nombre }}
                <q-btn
                  flat
                  size="lg"
                  round
                  color="pink"
                  icon="change_circle"
                  @click="combinaciones(coalicion.id)"
                >
                  <q-tooltip>Generar combinaciones</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-pa-none">
              <q-table
                grid
                flat
                bordered
                :rows="list_Combinaciones"
                :columns="columns"
                row-key="name"
                :filter="filter"
                hide-header
                v-model:pagination="pagination"
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

                <template v-slot:item="props">
                  <div class="col-xs-12 col-sm-6 col-md-4">
                    <q-card class="no-shadow" bordered>
                      <q-card-section class="text-center">
                        <q-avatar rounded font-size="82px" class="shadow-10">
                          <img :src="props.row.logo_Url" />
                        </q-avatar>
                      </q-card-section>

                      <q-card-section class="q-pt-none text-center">
                        <div class="text-caption text-grey-8">
                          {{ props.row.combinacion }}
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
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
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useCoalicionesStore } from "src/stores/coaliciones-store";
import { ref } from "vue";

//-----------------------------------------------------------

const $q = useQuasar();
const coalicionStore = useCoalicionesStore();
const { modalCombinaciones, list_Combinaciones, coalicion } =
  storeToRefs(coalicionStore);

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  coalicionStore.actualizarModalCombinaciones(valor);
};

const columns = [
  {
    name: "combinacion",
    label: "Combinacion",
    field: "combinacion",
    sortable: true,
    align: "left",
  },
  {
    name: "logo_Url",
    label: "Logo",
    field: "logo_Url",
    sortable: true,
    align: "left",
  },
];

const filter = ref("");

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 6,
});

const combinaciones = async (id) => {
  $q.loading.show();

  $q.dialog({
    title: "¿Está seguro de generar las combinaciones?",
    message: "Se borrarán las anteriores",
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
    let resp = await coalicionStore.generarCombinaciones(id);

    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: resp.data,
      });
      coalicionStore.getCombinaciones(id);
    } else {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "negative",
        message: resp.data,
      });
    }
  });

  $q.loading.hide();
};
</script>

<style></style>
