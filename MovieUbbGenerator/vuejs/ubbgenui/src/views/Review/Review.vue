<template>
  <main-menu :loading=this.loading></main-menu>
  <sui-container>
    <sui-grid >
      <sui-grid-row :columns="1">
        <sui-grid-column>
          <sui-card fluid horizontal v-if=!loading>
            <sui-image :src=item.poster />
            <sui-card-content>
              <sui-card-header>{{ item.title }}</sui-card-header>
              <sui-card-meta>
                <b>imdb:</b>{{ item.imdbRating }}
                <b>Genre:</b>{{ item.genre.join(', ') }}
                <b>Released:</b>{{ item.year }}
              </sui-card-meta>
              <sui-card-description>
                {{ item.plot }}
              </sui-card-description>
            </sui-card-content>
          </sui-card>
        </sui-grid-column>
      </sui-grid-row>
      <review-editor :platforms="platforms" :movie="item"/>
    </sui-grid>



  </sui-container>
</template>
<script lang="ts" src="./Review.ts"/>