<template>
  <sui-grid-row :columns="1">
    <sui-grid-column>
      <sui-menu secondary>
        <sui-menu-item @click="onDecorateEvent('left')"><sui-icon name="align left" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('center')"><sui-icon name="align center" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('right')"><sui-icon name="align right" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('justify')"><sui-icon name="align justify" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('bold')"><sui-icon name="bold" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('underline')"><sui-icon name="underline" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('italic')"><sui-icon name="italic" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('spoiler')"><sui-icon name="eye slash outline"/></sui-menu-item>
        <sui-menu-menu position="left">

          <sui-dropdown
              search
              selection
              fluid
              v-model="selectedPlatform"
              :options="platformlist"
              placeholder="Select Country"
          />


<!--          <sui-dropdown item text="Platform">-->
<!--            <sui-dropdown-menu>-->
<!--                <sui-menu-item v-for="item in platforms" v-bind:key="item.id">{{item.name}}</sui-menu-item>-->
<!--            </sui-dropdown-menu>-->
<!--          </sui-dropdown>-->
        </sui-menu-menu>

        <sui-menu-menu position="right">
          <sui-menu-item>
            <sui-input icon="star outline" placeholder="rating.." />
          </sui-menu-item>
        </sui-menu-menu>
      </sui-menu>
    </sui-grid-column>
  </sui-grid-row>
  <sui-grid-row>
    <sui-grid-column>
      <sui-form>
        <sui-form-textarea required="true"/>
      </sui-form>
    </sui-grid-column>
  </sui-grid-row>
  <sui-grid-row>
    <sui-grid-column>
      <sui-button-group>
        <sui-button basic><sui-icon name="angle left" />back</sui-button>
        <sui-button basic color="green" @click="generateReview()">Generate</sui-button>
      </sui-button-group>
    </sui-grid-column>
  </sui-grid-row>
</template>
<script lang="ts" src="./ReviewEditor.ts"/>