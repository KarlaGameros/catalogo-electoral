<template>
  <q-dialog
    v-model="modalGrupo"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          {{ !isEditar ? "Registrar grupo indígena" : "Editar grupo indígena" }}
        </div>
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
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="grupo.grupo"
              label="Nombre del grupo indigena"
              hint="Ingrese nombre del grupo indigena"
              autogrow
              lazy-rules
              :rules="[
                (val) => !!val || 'El nombre del grupo indigena es requerido',
              ]"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="grupo.clave"
              label="Clave"
              hint="Ingrese clave del grupo"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'La clave del grupo es requerido']"
            >
            </q-input>
          </div>
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
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { usePaisesPueblosStore } from "src/stores/paises-pueblos-store";

//-----------------------------------------------------------

const $q = useQuasar();
const paisesPueblosStore = usePaisesPueblosStore();
const { modalGrupo, isEditar, grupo } = storeToRefs(paisesPueblosStore);

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  paisesPueblosStore.actualizarModalGrupo(valor);
  paisesPueblosStore.updateEditar(valor);
  paisesPueblosStore.initGrupo();
  $q.loading.hide();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
    resp = await paisesPueblosStore.updateGrupo(grupo.value);
  } else {
    resp = await paisesPueblosStore.createGrupo(grupo.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    paisesPueblosStore.loadGrupos();
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

<style></style>
