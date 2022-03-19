<template>
  <sui-menu borderless secondary>
    <sui-menu-menu position="left">
      <sui-menu-item as="h3">
        {{ title }}
      </sui-menu-item>
    </sui-menu-menu>
    <sui-menu-menu position="right">
      <template v-if=paging>
      <sui-menu-item @click="rewind" :disabled="disableRewind">
        <sui-icon name="angle left"/>
      </sui-menu-item>
      <sui-menu-item @click="forward" :disabled="disableForward">
        <sui-icon name="angle right"/>
      </sui-menu-item>
      </template>
    </sui-menu-menu>
  </sui-menu>
  <sui-item-group>
    <sui-loader inline active v-if=loading></sui-loader>
    <template v-for="item in items" v-bind:key="item[keyname]" v-else>
      <slot :item="item"/>
    </template>
  </sui-item-group>
</template>
<script lang="ts" src="./MovieGroupList.ts"/>