<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 14:40:8
-->

<template src="./sample2-test1-page.html">
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import TestComponent from "./test-component/test-component.vue";
import Test2Component from "./test2-component/test2-component.vue";

@Component({
        components:{
        "my-test":TestComponent,
        "my-test2":Test2Component
    }
})
export default class extends Vue{
    value:string="";
    nav(){
        this.$router.push("/home/sample2-test2");
    }
    subNav(){
        this.$iceSub.push("test1");
    }
}
</script>
<style scoped src="./sample2-test1-page.scss" lang="scss"></style>