<template>
  <sui-item-group>
    <sui-item v-for="item in items" v-bind:key="item.reviewId">
      <sui-item-image>
        <img src="{{item.movie.poster}}">
      </sui-item-image>
      <sui-item-content>
        <sui-item-header>{{ item.title }}</sui-item-header>
        <sui-item-meta>
          <b>Tweakers:</b>{{ item.score }}
          <b>imdb:</b>{{item.movie.imdbRating}}
          <b>Genre:</b>{{ item.movie.genre }}
          <b>Released:</b>{{ item.movie.year }}
        </sui-item-meta>
        <sui-item-description>
          {{item.body}}
        </sui-item-description>
      </sui-item-content>
    </sui-item>
  </sui-item-group>
</template>
<script lang="ts" src="./MovieGroupList.ts"/>