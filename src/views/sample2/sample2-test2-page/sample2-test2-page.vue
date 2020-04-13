<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 14:40:15
-->

<template src="./sample2-test2-page.html">
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component({
})
export default class extends Vue{
    click(){
        const btnLoad=this.$iceBtnLoad();
        setTimeout(()=>btnLoad.cancel(),1500);
    }
}
</script>
<style scoped src="./sample2-test2-page.scss" lang="scss"></style>