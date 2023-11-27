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
        <q-btn flat round dense icon="apps" @click="show" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-expansion-item
          expand-separator
          icon="menu_book"
          label="Actor político"
          class="text-grey label-title text-bold"
        >
          <q-item
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
          expand-separator
          icon="menu_book"
          label="Catálogos generales"
          class="text-grey label-title text-bold"
        >
          <q-item
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
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="menu_book"
          label="Catálogos elecciones"
          class="text-grey label-title text-bold"
        >
          <q-item
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
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
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
