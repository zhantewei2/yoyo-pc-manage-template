<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhantewei
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-3-26 14:56:3
-->

<template src="./docs-home-page.html">
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import navData from "../../../router/vmd-navData";
import {dataFactory} from "../../../ice";
let _navData:any=dataFactory(navData);

@Component({})
export default class extends Vue{
    navData:any=_navData;
    currentData:any={"key":_navData};

    mounted(){

        console.log(navData);
    }
}
</script>
<style scoped src="./docs-home-page.scss" lang="scss"></style>