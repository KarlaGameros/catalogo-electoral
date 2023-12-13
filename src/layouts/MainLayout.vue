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
        <q-toolbar-title> Sistema </q-toolbar-title>
        <q-badge rounded color="green" />
        <q-btn flat round dense icon="apps" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-expansion-item
          v-if="CatalogosConList.length > 0"
          expand-separator
          icon="menu_book"
          label="Catálogos generales"
          class="text-grey label-title text-bold"
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
        </q-expansion-item>
        <q-expansion-item
          v-if="CatalogosConList.length > 0"
          expand-separator
          icon="menu_book"
          label="Catálogos elecciones"
          class="text-grey label-title text-bold"
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
        </q-expansion-item>
        <q-expansion-item
          v-if="CatalogosConList.length > 0"
          expand-separator
          icon="menu_book"
          label="Actor político"
          class="text-grey label-title text-bold"
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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MainLayout",
  storage: Storage | undefined,
  components: {},

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const route = useRoute();
    const authStore = useAuthStore();
    const usuario = ref("");
    const { modulos, sistemas, apps } = storeToRefs(authStore);
    const CatalogosConList = ref([]);
    const ConsumiblesList = ref([]);
    const SolicitudesList = ref([]);

    onBeforeMount(async () => {
      if (route.query.key) {
        localStorage.setItem("key", route.query.key);
      }

      if (route.query.sistema) {
        localStorage.setItem("sistema", route.query.sistema);
      }

      if (route.query.usr) {
        localStorage.setItem("usuario", route.query.usr);
        usuario.value = localStorage.getItem("usuario");
      } else {
        if (localStorage.getItem("usuario") != null) {
          usuario.value = localStorage.getItem("usuario");
        }
      }
      await loadMenu();
    });

    const show = () => {
      $q.bottomSheet({
        message: "Aplicaciones",
        grid: true,
        actions: apps.value,
      }).onOk((action) => {
        if (action.label == "Cerrar sesión") {
          localStorage.clear();
          window.location = "http://sistema.ieenayarit.org:9371?return=false";
        } else if (action.label == "Ir a universo") {
          window.location = "http://sistema.ieenayarit.org:9370?return=true";
        } else {
          window.location =
            action.url +
            `/#/?key=${localStorage.getItem("key")}&sistema=${
              action.id
            }&usr=${localStorage.getItem("usuario")}`;
        }
      });
    };

    const loadMenu = async () => {
      $q.loading.show();
      await authStore.loadSistemas();
      await authStore.loadModulos();
      await authStore.loadPerfil();
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
        }
      });
      $q.loading.hide();
    };

    return {
      leftDrawerOpen,
      CatalogosConList,
      ConsumiblesList,
      SolicitudesList,
      usuario,
      show,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scope>
.bg-pink-1 {
  background: #d1308a !important;
}
.text-pink-ieen-1 {
  color: #d1308a !important;
}
</style>
