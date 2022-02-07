<template>
  <sui-container>
    <sui-grid :columns="2">
      <sui-grid-column>
        <MovieGroupList resource="/api/reviews/latest"/>
      </sui-grid-column>
      <sui-grid-column>
        <MovieGroupList/>
      </sui-grid-column>
    </sui-grid>

  </sui-container>

</template>

<script lang="ts" src="./Home.ts"/>