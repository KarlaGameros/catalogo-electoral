<template>
  <q-layout view="lHh LpR lff">
    <q-header elevated class="bg-pink-1">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Sistema Configuración Electoral</q-toolbar-title>
        <q-btn flat round dense icon="apps" @click="show" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <div class="text-center">
          <q-img src="../assets/Configuracion.png" />
        </div>
        <div class="text-weight-bold text-black q-pa-md">
          Bienvenido(a) <br />
          {{ usuario_Nombre }}
        </div>
        <q-item
          clickable
          v-ripple
          class="text-grey-8 text-bold"
          :to="{ name: 'inicio' }"
          active-class="text-pink-ieen-1"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section> Inicio </q-item-section>
        </q-item>
        <q-expansion-item
          v-if="CatalogosConList.length > 0"
          expand-separator
          icon="how_to_vote"
          label="Catálogos generales"
          class="text-grey-8 label-title text-bold"
        >
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-DI')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'distritos' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Distritos </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-MU')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'municipios' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Municipios </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-DE')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'demarcaciones' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Demarcaciones </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-SE')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'secciones' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>
            <q-item-section> Secciones </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'comunesRegistradas' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>
            <q-item-section> Comunes registradas RP </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          v-if="CatalogosConList.length > 0"
          expand-separator
          icon="how_to_vote"
          label="Catálogos elecciones"
          class="text-grey-8 label-title text-bold"
        >
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-TIP-EL')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'tipo_elecciones' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Tipo de elecciones </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-TIP-CA')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'tipo_casillas' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Tipo de casillas </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-CA')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'casillas' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Casillas </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-CA')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'voto_anticipado' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>
            <q-item-section> Voto anticipado </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          v-if="CatalogosConList.length > 0"
          expand-separator
          icon="how_to_vote"
          label="Actor político"
          class="text-grey-8 label-title text-bold"
        >
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-PP')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'partidos_politicos' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Partidos políticos </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-CO')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'coaliciones' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Coaliciones </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          v-if="CatalogosConList.length > 0"
          expand-separator
          icon="groups"
          label="Conóceles"
          class="text-grey-8 label-title text-bold"
        >
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-PRE-ID')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'preguntasConoceles' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Preguntas </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-RUB-EV')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'rubrosConoceles' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Rubros a evaluar </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-PA')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'paises' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Países </q-item-section>
          </q-item>
          <q-item
            v-if="CatalogosConList.some((element) => element == 'SCE-CAT-GI')"
            clickable
            v-ripple
            class="text-grey-8"
            :to="{ name: 'gruposIndigenas' }"
            active-class="text-pink-ieen-1"
          >
            <q-item-section avatar>
              <q-icon name="chevron_right" />
            </q-item-section>

            <q-item-section> Grupos indígenas </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
      <div
        v-if="CatalogosConList.some((element) => element == 'SCE-BTN-LC')"
        class="text-center q-pa-md items-start q-gutter-md"
      >
        <q-btn
          type="button"
          color="blue-grey-5"
          icon-right="cleaning_services"
          label="Limpiar cache"
          @click="limpiarCache()"
        />
      </div>
      <div
        v-if="CatalogosConList.some((element) => element == 'SCE-ASI-FO')"
        class="text-center q-pa-md items-start q-gutter-md"
      >
        <q-btn
          type="button"
          color="blue-grey-4"
          icon-right="tag"
          label="Asignar No. fórmula"
          @click="asignarFormula()"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { useConocelesStore } from "src/stores/conoceles-store";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { EncryptStorage } from "storage-encryption";

const leftDrawerOpen = ref(false);
const $q = useQuasar();
const route = useRoute();
const authStore = useAuthStore();
const encryptStorage = new EncryptStorage("SECRET_KEY", "sessionStorage");
const conocelesStore = useConocelesStore();
const usuario = ref("");
const { modulos, sistemas, apps, usuario_Nombre } = storeToRefs(authStore);
const CatalogosConList = ref([]);
const showAvance = ref(false);

onBeforeMount(async () => {
  showAvance.value = true;
  if (route.query.key) {
    encryptStorage.encrypt("key", route.query.key);
  }
  if (route.query.sistema) {
    encryptStorage.encrypt("sistema", route.query.sistema);
  }
  if (route.query.usr) {
    encryptStorage.encrypt("usuario", route.query.usr);
    usuario.value = encryptStorage.decrypt("usuario");
  } else {
    if (encryptStorage.decrypt("usuario") != null) {
      usuario.value = encryptStorage.decrypt("usuario");
    }
  }
  if (route.query.userNameL) {
    encryptStorage.encrypt("userNameL", route.query.userNameL);
  }
  await loadMenu();
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const show = () => {
  $q.bottomSheet({
    message: "Aplicaciones",
    grid: true,
    actions: apps.value,
  }).onOk((action) => {
    if (action.label == "Cerrar sesión") {
      localStorage.clear();
      sessionStorage.clear();
      window.location = "https://acceso.sistemas-ieenayarit.org";
    } else if (action.label == "Ir a universo") {
      window.location = `https://acceso.sistemas-ieenayarit.org?key=${encryptStorage.decrypt(
        "key"
      )}&UserName=${encryptStorage.decrypt("userNameL")}`;
    } else {
      window.location =
        action.url +
        `/#/?key=${encryptStorage.decrypt("key")}&sistema=${
          action.id
        }&usr=${encryptStorage.decrypt("usuario")}`;
    }
  });
};

const loadMenu = async () => {
  $q.loading.show();
  await authStore.loadSistemas();
  await authStore.loadModulos();
  await authStore.loadPerfil();
  await authStore.loadUsuario();
  modulos.value.forEach((element) => {
    switch (element.siglas_Modulo) {
      case "SCE-CAT-DI":
        CatalogosConList.value.push("SCE-CAT-DI");
        break;
      case "SCE-CAT-MU":
        CatalogosConList.value.push("SCE-CAT-MU");
        break;
      case "SCE-CAT-DE":
        CatalogosConList.value.push("SCE-CAT-DE");
        break;
      case "SCE-CAT-SE":
        CatalogosConList.value.push("SCE-CAT-SE");
        break;
      case "SCE-TIP-EL":
        CatalogosConList.value.push("SCE-TIP-EL");
        break;
      case "SCE-TIP-CA":
        CatalogosConList.value.push("SCE-TIP-CA");
        break;
      case "SCE-CAT-CA":
        CatalogosConList.value.push("SCE-CAT-CA");
        break;
      case "SCE-CAT-PP":
        CatalogosConList.value.push("SCE-CAT-PP");
        break;
      case "SCE-CAT-CO":
        CatalogosConList.value.push("SCE-CAT-CO");
        break;
      case "SCE-PRE-ID":
        CatalogosConList.value.push("SCE-PRE-ID");
        break;
      case "SCE-RUB-EV":
        CatalogosConList.value.push("SCE-RUB-EV");
        break;
      case "SCE-CAT-PA":
        CatalogosConList.value.push("SCE-CAT-PA");
        break;
      case "SCE-CAT-GI":
        CatalogosConList.value.push("SCE-CAT-GI");
        break;
      case "SCE-BTN-LC":
        CatalogosConList.value.push("SCE-BTN-LC");
        break;
      case "SCE-ASI-FO":
        CatalogosConList.value.push("SCE-ASI-FO");
        break;
    }
  });
  $q.loading.hide();
};

const limpiarCache = () => {
  $q.dialog({
    title: "Limpiar caché",
    message: "¿Está seguro de limpiar la caché de Conóceles?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, aceptar",
    },
    cancel: {
      color: "negative",
      label: " No Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await conocelesStore.limpiarCache();
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: "Caché eliminado",
      });
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

const asignarFormula = () => {
  $q.dialog({
    title: "Asignar número de fórmula",
    message: "¿Está seguro de asignar número de fórmula?",
    icon: "Warning",
    persistent: true,
    transitionShow: "scale",
    transitionHide: "scale",
    ok: {
      color: "positive",
      label: "¡Sí!, aceptar",
    },
    cancel: {
      color: "negative",
      label: " No Cancelar",
    },
  }).onOk(async () => {
    $q.loading.show();
    const resp = await conocelesStore.asignarNoFormula();
    if (resp.success) {
      $q.loading.hide();
      $q.notify({
        position: "top-right",
        type: "positive",
        message: "Número de fórmula asignado",
      });
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
</script>

<style scope>
.bg-pink-1 {
  background: #d1308a !important;
}
.text-pink-ieen-1 {
  color: #d1308a !important;
}
</style>
