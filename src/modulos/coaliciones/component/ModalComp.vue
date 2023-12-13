<template>
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">
          {{ !isEditar ? "Registrar coalición" : "Editar coalición" }}
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
              filled
              v-model.trim="coalicion.nombre"
              label="Nombre"
              hint="Ingrese nombre del actor político"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="coalicion.siglas"
              label="Siglas"
              hint="Ingrese siglas de la coalición"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'Las siglas son requeridas']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-file
              filled
              bottom-slots
              v-model="logo_URL"
              label="Logo"
              counter
              accept=".jpg, image/*"
            >
              <template v-if="isEditar" v-slot:prepend>
                <q-avatar>
                  <img :src="coalicion.logo_URL" />
                </q-avatar>
              </template>

              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="coalicion.logo_URL = null"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:hint> Logo </template>
            </q-file>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.number="coalicion.orden"
              label="Orden de la coalición"
              hint="Ingrese el orden"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'La campo orden es requerido']"
            >
            </q-input>
          </div>

          <div class="col-12 justify-end">
            <div class="text-right q-gutter-xs">
              <q-btn
                label="Cancelar"
                type="reset"
                color="negative"
                @click="actualizarModal(false)"
              />
              <q-btn
                label="Guardar"
                type="submit"
                color="positive"
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
import { useCoalicionesStore } from "src/stores/coaliciones-store";
import { ref } from "vue";

//-----------------------------------------------------------

const $q = useQuasar();
const coalicionStore = useCoalicionesStore();
const { modal, isEditar, coalicion } = storeToRefs(coalicionStore);
const logo_URL = ref(null);

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  coalicionStore.actualizarModal(valor);
  coalicionStore.updateEditar(valor);
  coalicionStore.initCoalicion();
};

const onSubmit = async () => {
  let coalicionFormData = new FormData();
  coalicionFormData.append("Nombre", coalicion.value.nombre);
  coalicionFormData.append("Siglas", coalicion.value.siglas);
  coalicionFormData.append("Logo", logo_URL.value);
  coalicionFormData.append("Orden", coalicion.value.orden);

  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
    resp = await coalicionStore.updateCoalicion(
      coalicion.value.id,
      coalicionFormData
    );
  } else {
    resp = await coalicionStore.createCoalicion(coalicionFormData);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    coalicionStore.loadCoaliciones();
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
