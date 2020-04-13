<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-19 11:40:25
-->

<template>
    <article class="yo-cell" :class="['flex-'+p]">
        <slot></slot>
    </article>
</template>

<script lang="ts">
import Vue from "vue";
import {Component,Prop} from "vue-property-decorator";

@Component({})
export default class extends Vue{
    @Prop({default:1})p:number;
}
</script>
<style scoped src="./cell-component.scss" lang="scss"></style>