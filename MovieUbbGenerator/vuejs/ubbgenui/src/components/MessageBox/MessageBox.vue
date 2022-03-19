<template>
    <sui-message :positive=isSuccess info=isInfo warning=isWarning>
        <sui-icon name="close" v-if:="isClosable" />
        <sui-message-header>{{title}}</sui-message-header>
        <p v-for="(item, index) in errors"  :key="index">{{item}}</p>
    </sui-message>
</template>
<script type="ts" src="./MessageBox.ts"/>