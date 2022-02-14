<template>
  <sui-menu>
    <sui-menu-item @click="go('Home')">
      <sui-icon name="home" />
    </sui-menu-item>
    <sui-menu-item @click="go('Gallery')">
      <sui-icon name="images outline" />
    </sui-menu-item>
    <sui-menu-menu>
      <sui-menu-item>
        <sui-input :loading=loading iconPosition="left" icon="search" placeholder="Search..."  v-model="searchTerm" onsubmit="onSubmit" />
      </sui-menu-item>
    </sui-menu-menu>
  </sui-menu>
</template>
<script lang="ts" src="./MainMenu.ts"/>