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
            !isEditar ? "Registrar partido político" : "Editar partido político"
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
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model.trim="partido.nombre"
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
              v-model.trim="partido.siglas"
              label="Siglas"
              hint="Ingrese siglas del actor político"
              autogrow
              lazy-rules
              :rules="[(val) => !!val || 'Las siglas son requeridas']"
            >
            </q-input>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <q-file
              bottom-slots
              v-model="logo_URL"
              label="Logo"
              counter
              accept=".jpg, image/*"
            >
              <template v-if="isEditar" v-slot:prepend>
                <q-avatar square style="width: auto; height: 35px">
                  <img :src="partido.logo_URL" />
                </q-avatar>
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="partido.logo_URL = null"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:hint> Logo </template>
            </q-file>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <q-input
              v-model.number="partido.prioridad"
              type="number"
              label="Prioridad"
              hint="Ingrese la prioridad"
              lazy-rules
              :rules="[(val) => !!val || 'La campo es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <q-input
              v-model.number="partido.orden_Publicacion"
              type="number"
              label="Orden publicación"
              hint="Ingrese orden de publicación"
              lazy-rules
              :rules="[(val) => !!val || 'La campo es requerido']"
            >
            </q-input>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <q-checkbox
              color="pink"
              v-model="partido.independiente"
              label="Es independiente"
            />
          </div>
          <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
            <q-checkbox
              color="pink"
              v-model="partido.is_Comun"
              label="Es común"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="partido.pantone_Letra"
              hint="Ingrese el pantone letra"
              class="my-input"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="partido.pantone_Letra" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <q-input
              v-model="partido.pantone_Fondo"
              hint="Ingrese el pantone fondo"
              class="my-input"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="partido.pantone_Fondo" />
                  </q-popup-proxy>
                </q-icon>
              </template>
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
import { usePartidosPoliticosStore } from "src/stores/partidos-politicos-store";
import { ref } from "vue";

//-----------------------------------------------------------

const $q = useQuasar();
const partidosStore = usePartidosPoliticosStore();
const { modal, isEditar, partido } = storeToRefs(partidosStore);
const logo_URL = ref(null);

//-----------------------------------------------------------
const actualizarModal = (valor) => {
  logo_URL.value = null;
  partidosStore.actualizarModal(valor);
  partidosStore.updateEditar(valor);
  partidosStore.initPartido();
};

const onSubmit = async () => {
  let partidoFormData = new FormData();
  partidoFormData.append("Nombre", partido.value.nombre);
  partidoFormData.append("Siglas", partido.value.siglas);
  partidoFormData.append("Logo", logo_URL.value);
  partidoFormData.append("Independiente", partido.value.independiente);
  partidoFormData.append("Prioridad", partido.value.prioridad);
  partidoFormData.append("Pantone_Fondo", partido.value.pantone_Fondo);
  partidoFormData.append("Pantona_Letra", partido.value.pantone_Letra);
  partidoFormData.append("Is_Comun", partido.value.is_Comun);
  partidoFormData.append("Orden_Publicacion", partido.value.orden_Publicacion);
  let resp = null;
  $q.loading.show();
  if (isEditar.value == true) {
    resp = await partidosStore.updatePartdio(partido.value.id, partidoFormData);
  } else {
    resp = await partidosStore.createPartidoPolitico(partidoFormData);
  }
  if (resp.success) {
    $q.notify({
      position: "top-right",
      type: "positive",
      message: resp.data,
    });
    partidosStore.loadPartidosPoliticos();
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
