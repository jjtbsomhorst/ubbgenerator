<template>
  <sui-item-group>
    <template v-for="item in items" v-bind:key="item.reviewId">
      <slot :item="item"/>
    </template>
  </sui-item-group>
</template>
<script lang="ts" src="./MovieGroupList.ts"/>