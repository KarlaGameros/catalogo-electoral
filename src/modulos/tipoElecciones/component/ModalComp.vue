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
          {{
            !isEditar ? "Registrar tipo de elección" : "Editar tipo de elección"
          }}
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
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <q-input
              v-model.trim="eleccion.nombre"
              label="Nombre del tipo de elección"
              hint="Ingrese nombre de la elección"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'El nombre es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <q-input
              v-model.trim="eleccion.siglas"
              label="Siglas"
              hint="Ingrese siglas de la elección"
              lazy-rules
              :rules="[(val) => !!val || 'Las siglas es requerida']"
            >
            </q-input>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-center">
            <q-checkbox
              color="pink"
              right-label
              v-model="eleccion.activo"
              label="¿Activo?"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="eleccion.correo"
              label="Correo MR"
              hint="Ingrese correo MR"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="eleccion.contrasena"
              label="Contraseña MR"
              hint="Ingrese contraseña MR"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="eleccion.smtp"
              label="Smpt MR"
              hint="Ingrese smpt MR"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="eleccion.puerto"
              label="Puerto MR"
              hint="Ingrese puerto MR"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="eleccion.correo_RP"
              label="Correo RP"
              hint="Ingrese correo RP"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="eleccion.contrasena_RP"
              label="Contraseña RP"
              hint="Ingrese contraseña RP"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="eleccion.smtp_RP"
              label="Smpt RP"
              hint="Ingrese smpt RP"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="eleccion.puerto_RP"
              label="Puerto RP"
              hint="Ingrese puerto RP"
              autogrow
            >
            </q-input>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <q-checkbox
              color="pink"
              right-label
              v-model="eleccion.propietario_1"
              label="Propietario 1"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <q-checkbox
              color="pink"
              right-label
              v-model="eleccion.suplente_1"
              label="Suplente 1"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <q-checkbox
              color="pink"
              right-label
              v-model="eleccion.propietario_2"
              label="Propietario 2"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <q-checkbox
              color="pink"
              right-label
              v-model="eleccion.suplente_2"
              label="Suplente 2"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>

          <div class="col-12 justify-end q-pt-lg">
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
import { useTipoEleccionesStore } from "src/stores/tipo-elecciones";
import { onBeforeMount } from "vue";

//-----------------------------------------------------------

const $q = useQuasar();
const eleccionesStore = useTipoEleccionesStore();
const { modal, isEditar, eleccion } = storeToRefs(eleccionesStore);

//-----------------------------------------------------------

onBeforeMount(() => {
  eleccionesStore.loadTiposEleeciones();
});

const actualizarModal = (valor) => {
  eleccionesStore.actualizarModal(valor);
  eleccionesStore.updateEditar(valor);
  eleccionesStore.initElecciones();
};

const onSubmit = async () => {
  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
    resp = await eleccionesStore.updateEleccion(eleccion.value);
  } else {
    resp = await eleccionesStore.createEleccion(eleccion.value);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    eleccionesStore.loadTiposEleeciones();
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
