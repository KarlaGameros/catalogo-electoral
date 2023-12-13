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
          {{ !isEditar ? "Registrar municipio" : "Editar municipio" }}
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
            <q-select
              filled
              v-model.trim="estado_Id"
              :options="list_Estados"
              label="Seleccione un estado"
              hint="Seleccione un estado"
              lazy-rules
              :rules="[(val) => !!val || 'El estado es requerido']"
            >
            </q-select>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="municipio.nombre"
              label="Nombre del municipio"
              hint="Ingrese nombre del municipio"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              filled
              v-model.trim="municipio.clave"
              label="Clave"
              hint="Ingrese clave"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'La clave es requerida']"
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
import { useMunicipiosStore } from "src/stores/municipios-store";
import { onBeforeMount, ref } from "vue";

//-----------------------------------------------------------

const $q = useQuasar();
const municipioStore = useMunicipiosStore();
const { modal, isEditar, municipio, list_Estados } =
  storeToRefs(municipioStore);
const estado_Id = ref(null);
//Get fecha actual
const dateActual = new Date();
const year = dateActual.getFullYear();
const month = String(dateActual.getMonth() + 1).padStart(2, "0");
const day = String(dateActual.getDate()).padStart(2, "0");
const date = ref(`${year}/${month}/${day}`);

//-----------------------------------------------------------

onBeforeMount(() => {
  municipioStore.loadEstados();
});
//-----------------------------------------------------------

const actualizarModal = (valor) => {
  municipioStore.actualizarModal(valor);
  municipioStore.updateEditar(valor);
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  municipio.value.fecha_Registro = date.value;
  municipio.value.estado_Id = estado_Id.value.value;
  if (isEditar.value == true) {
    resp = await municipioStore.updateMunicipio(municipio.value);
  } else {
    resp = await municipioStore.createMunicipio(municipio.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    marcaStore.loadInformacionMarca();
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
