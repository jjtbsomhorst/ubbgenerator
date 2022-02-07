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
        <sui-input transparent icon="search" placeholder="Search..." />
      </sui-menu-item>
    </sui-menu-menu>
  </sui-menu>
</template>
<script lang="ts" src="./MainMenu.ts"/>