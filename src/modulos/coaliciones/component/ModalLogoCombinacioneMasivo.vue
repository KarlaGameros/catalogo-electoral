<template>
  <q-dialog
    v-model="modalLogoMasivo"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Asignar logos de combinaciones</div>
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
          <div class="col-12">
            <q-file
              v-model="files"
              label="Seleccione los logos"
              outlined
              use-chips
              multiple
              ><template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
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
                label="Guardar"
                type="submit"
                color="secondary"
                class="q-ml-sm"
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
const { modalLogoMasivo } = storeToRefs(coalicionStore);
const files = ref(null);

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  files.value = null;
  coalicionStore.actualizarModalLogoMasivo(valor);
};

const onSubmit = async () => {
  $q.loading.show();
  let logosFormData = new FormData();
  files.value.forEach((row) => {
    logosFormData.append("Logo", row);
  });
  let resp = null;

  resp = await coalicionStore.subirLogosMasivo(logosFormData);
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: "Los logos se asignarón correctamente",
    });
    actualizarModal(false);
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
