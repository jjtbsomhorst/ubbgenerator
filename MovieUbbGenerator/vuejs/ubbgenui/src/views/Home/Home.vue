<template>


  <main-menu :loading=this.loading></main-menu>
  <sui-container>
    <sui-grid :columns="1">

    </sui-grid>
    <sui-grid :columns="2">
      <sui-grid-column v-if="search">
        <MovieGroupList :resource="searchResource" :paging="true" v-show=search title="Results">
          <template v-slot:default="props">
            <sui-card fluid horizontal>
              <sui-image :src=props.item.poster />
              <sui-card-content>
                <sui-card-header>{{ props.item.title }}</sui-card-header>
                <sui-card-meta>
                  <b>imdb:</b>{{ props.item.imdbRating }}
                  <b>Genre:</b>{{ props.item.genre.join(', ') }}
                  <b>Released:</b>{{ props.item.year }}
                </sui-card-meta>
                <sui-card-description>
                  {{ props.item.plot }}
                </sui-card-description>
              </sui-card-content>
              <sui-card-content extra>
                <div class="right floated">
                  <router-link :to="{name: 'review',query:{reviewId: props.item.imdbid}}" ><sui-button basic>
                    <sui-icon name="font" />
                    Write review
                  </sui-button></router-link></div>
              </sui-card-content>
            </sui-card>
          </template>
        </MovieGroupList>
      </sui-grid-column>

      <sui-grid-column v-else>
        <MovieGroupList resource="/api/reviews/latest" :paging="false" :key="reviewId" title="Latest reviews">
          <template v-slot:default="props">
            <sui-card fluid horizontal>
              <sui-image :src=props.item.movie.poster />
              <sui-card-content>
                <sui-card-header>
                  {{ props.item.movie.title }}
                </sui-card-header>
                <sui-card-meta>
                  <b>Tweakers:</b>{{ props.item.score }}
                  <b>imdb:</b>{{ props.item.movie.imdbRating }}
                  <b>Genre:</b>{{ props.item.movie.genre.join(', ') }}
                  <b>Released:</b>{{ props.item.movie.year }}
                </sui-card-meta>
                <sui-card-description>
                  {{ props.item.movie.plot }}
                </sui-card-description>
              </sui-card-content>
              <sui-card-content extra>
                <div class="right floated">
                  <router-link :to="{name: 'review',query:{reviewId: props.item.imdbId}}" ><sui-button basic>
                    <sui-icon name="font" />
                    Write review
                  </sui-button></router-link></div>
              </sui-card-content>
            </sui-card>
          </template>
        </MovieGroupList>
      </sui-grid-column>

      <sui-grid-column>
        <MovieGroupList resource="api/movies/nowplaying" :paging="false" :key="imdbid" title="Now playing">
          <template v-slot:default="props">
            <sui-card fluid horizontal>
              <sui-image :src=props.item.poster />
              <sui-card-content>
                <sui-card-header>
                  {{ props.item.title }}
                </sui-card-header>
                <sui-card-meta>
                  <b>Genre:</b>{{ props.item.genre.join(', ') }}
                  <b>Released:</b>{{ props.item.year }}
                </sui-card-meta>
                <sui-card-description>
                  {{ props.item.plot }}
                </sui-card-description>
              </sui-card-content>
              <sui-card-content extra>
                <div class="right floated">
                  <router-link :to="{name: 'review',query:{reviewId: props.item.imdbid}}" >
                <sui-button basic >
                  <sui-icon name="font" />
                  Write review
                </sui-button></router-link></div>
                </sui-card-content>
            </sui-card>
          </template>
        </MovieGroupList>
      </sui-grid-column>

    </sui-grid>
  </sui-container>

</template>

<script lang="ts" src="./Home.ts"/>