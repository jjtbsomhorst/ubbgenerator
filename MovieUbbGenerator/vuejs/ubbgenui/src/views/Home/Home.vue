<template>


    <main-menu :loading=this.loading></main-menu>
<!--      <sui-dimmer v-bind:active=this.loading>-->
<!--        <sui-loader text>Loading</sui-loader>-->
<!--      </sui-dimmer>-->
    <sui-container>
    <sui-grid :columns="1">
      <sui-grid-column>
      <MovieSearchList></MovieSearchList>
      </sui-grid-column>
    </sui-grid>
    <sui-grid :columns="2" v-show=!search>
      <sui-grid-column>
        <MovieGroupList resource="/api/reviews/latest">
          <template v-slot:default="props">
            <sui-item>
              <sui-item-image>
                <img :src=props.item.movie.poster>
              </sui-item-image>
              <sui-item-content>
                <sui-item-header>{{ props.item.title }}</sui-item-header>
                <sui-item-meta>
                  <b>Tweakers:</b>{{ props.item.score }}
                  <b>imdb:</b>{{props.item.movie.imdbRating}}
                  <b>Genre:</b>{{ props.item.movie.genre }}
                  <b>Released:</b>{{ props.item.movie.year }}
                </sui-item-meta>
                <sui-item-description>
                  {{props.item.body}}
                </sui-item-description>
              </sui-item-content>
            </sui-item>
          </template>
        </MovieGroupList>
      </sui-grid-column>
      <sui-grid-column>

      </sui-grid-column>
    </sui-grid>
  </sui-container>

</template>

<script lang="ts" src="./Home.ts"/>