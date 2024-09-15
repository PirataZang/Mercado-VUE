<script setup lang="ts">
import collect from 'collect.js';
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <div class="wrapper">
      <nav class="menu">
        <div class="routes">
          <RouterLink to="/products">Produtos</RouterLink>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

