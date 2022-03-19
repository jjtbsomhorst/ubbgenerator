<template>
  <sui-grid-row :columns="1">
    <sui-grid-column>
      <sui-menu secondary>
        <sui-menu-item @click="onDecorateEvent('left')"><sui-icon name="align left" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('center')"><sui-icon name="align center" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('right')"><sui-icon name="align right" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('justify')"><sui-icon name="align justify" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('b')"><sui-icon name="bold" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('u')"><sui-icon name="underline" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('i')"><sui-icon name="italic" /></sui-menu-item>
        <sui-menu-item @click="onDecorateEvent('spoiler')"><sui-icon name="eye slash outline"/></sui-menu-item>
        <sui-menu-menu position="left">

          <sui-dropdown
              search
              selection
              fluid
              v-model="selectedPlatform"
              :options="platformlist"
              placeholder="Select platform"
          />
          <sui-menu-item v-if="isOther">
            <sui-input placeholder="platform" v-model="customPlatform"/>
          </sui-menu-item>
        </sui-menu-menu>

        <sui-menu-menu position="right">
          <sui-menu-item>
            <div class="ui icon input" type="number">
              <input type="number"  min="1" max="10" step="0.5" placeholder="rating.." v-model="rating"><i aria-hidden="true" class="star outline icon"></i></div>
              <!-- <sui-rating :defaultRating="1" :maxRating="10" color="yellow" :value="rating"/> -->
          </sui-menu-item>
        </sui-menu-menu>
      </sui-menu>
    </sui-grid-column>
  </sui-grid-row>
  <sui-grid-row>
    <sui-grid-column>
        <MessageBox type="info" v-if="hasError" :title="error.error" :errors="error.details" />
    </sui-grid-column>
  </sui-grid-row>
  
  <sui-grid-row>
    <sui-grid-column>
      <div class="ui form">
          <textarea v-model="reviewText" id="ReviewEditor"></textarea>
      </div>
    </sui-grid-column>
  </sui-grid-row>
  <sui-grid-row>
    <sui-grid-column>
      <sui-item>
        <sui-item-content>
          <sui-item-header>
            <sui-menu secondary>
              <sui-menu-menu position="left">
              <sui-menu-item as="p">Preview</sui-menu-item>
              </sui-menu-menu>
                
              <sui-menu-menu position="right">
                <sui-menu-item @click="togglePreview">
                <sui-icon :name="previewIcon"></sui-icon>
                </sui-menu-item>
              </sui-menu-menu>
            </sui-menu>
          </sui-item-header>
          <sui-item-description :hidden="previewVisible">
            <textarea readonly v-model="review" id="ReviewResult"></textarea>
          </sui-item-description>
        </sui-item-content>
      </sui-item>
    </sui-grid-column>
  </sui-grid-row>
    
  <sui-grid-row>
    <sui-grid-column>
      <sui-button-group>
        <sui-button basic><sui-icon name="angle left" />back</sui-button>
        <sui-button basic color="green" :disabled="!isValid" @click="generateReview()">Generate</sui-button>
      </sui-button-group>
    </sui-grid-column>
  </sui-grid-row>

  
</template>
<script lang="ts" src="./ReviewEditor.ts"/>