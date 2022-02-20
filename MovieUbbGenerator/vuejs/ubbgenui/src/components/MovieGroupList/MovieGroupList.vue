<template>
  <sui-menu borderless secondary v-if=paging>
    <sui-menu-menu position="left">
      <sui-menu-item as="h3">
        {{ title }}
      </sui-menu-item>
    </sui-menu-menu>
    <sui-menu-menu position="right">
      <sui-menu-item @click="rewind" :disabled="disableRewind">
        <sui-icon name="angle left"/>
      </sui-menu-item>
      <sui-menu-item @click="forward" :disabled="disableForward">
        <sui-icon name="angle right"/>
      </sui-menu-item>
    </sui-menu-menu>
  </sui-menu>
  <h3 v-else>{{title}}</h3>
  <sui-item-group>
    <template v-for="item in items" v-bind:key="item[keyname]">
      <slot :item="item"/>
    </template>
  </sui-item-group>
</template>
<script lang="ts" src="./MovieGroupList.ts"/>