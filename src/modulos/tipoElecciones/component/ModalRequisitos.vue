<template>
  <q-dialog
    v-model="modalRequisitos"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row">
        <div class="text-h6">Requisitos de tipos de elecciones</div>
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
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model.trim="requisistos.nombre"
              label="Nombre del requisito"
              hint="Ingrese nombre del requisito"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <q-input
              v-model.trim="requisistos.descripcion"
              label="Descripción"
              hint="Ingrese descripción del requisito"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-center">
            <q-checkbox
              color="pink"
              v-model="requisistos.archivo"
              label="El requisito es un documento"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-center">
            <q-checkbox
              color="pink"
              v-model="requisistos.genero"
              label="Género?"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-center">
            <q-checkbox
              color="pink"
              v-model="requisistos.activo"
              label="Activar requisito"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-center">
            <q-checkbox
              color="pink"
              v-model="requisistos.obligatorio"
              label="Obligatorio"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>

          <div class="col-12 justify-end q-pt-lg">
            <div class="text-right q-gutter-xs">
              <q-btn
                :label="isEditar ? 'Editar' : 'Agregar'"
                :icon="isEditar ? 'edit' : 'add'"
                type="submit"
                color="secondary"
                class="q-ml-sm"
              />
            </div>
          </div>
        </q-form>
        <TablaRequisitos />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useTipoEleccionesStore } from "src/stores/tipo-elecciones";
import { onBeforeMount, watch } from "vue";
import TablaRequisitos from "../component/TablaRequisitos.vue";

//-----------------------------------------------------------

const $q = useQuasar();
const eleccionesStore = useTipoEleccionesStore();
const { modalRequisitos, isEditar, requisistos, eleccion } =
  storeToRefs(eleccionesStore);

//-----------------------------------------------------------

onBeforeMount(() => {
  eleccionesStore.loadTiposEleeciones();
});

//-----------------------------------------------------------

const actualizarModal = (valor) => {
  $q.loading.show();
  eleccionesStore.actualizarModalRequisitos(valor);
  eleccionesStore.initRequisitos();
  $q.loading.hide();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  requisistos.value.tipo_Eleccion_Id = eleccion.value.id;
  if (isEditar.value == true) {
    resp = await eleccionesStore.updateRequisitosEleccion(requisistos.value);
  } else {
    resp = await eleccionesStore.createRequisitos(
      eleccion.value.id,
      requisistos.value
    );
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    eleccionesStore.loadRequisitos(requisistos.value.tipo_Eleccion_Id);
    eleccionesStore.initRequisitos();
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
