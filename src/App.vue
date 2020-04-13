<template>
  <router-view/>
</template>
<script lang="ts">
import {Component,Prop,Vue} from "vue-property-decorator";


@Component
export default class extends Vue{
    @Prop({default:""})name!:string;

}
</script>
<style lang="scss">
</style>
