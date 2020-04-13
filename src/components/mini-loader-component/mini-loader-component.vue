<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-25 13:21:36
-->

<template>
    <span>
        <transition name="animate-abs-fade">
        <div class="yo-loading-block" v-if="show" v-once>
            <div class="svg">
                <i class="fa fa-loader ice-fa-loader"></i>
            </div>
        </div>
        </transition>
    </span>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";


@Component({})
export default class extends Vue{

    @Prop({default:false})show:boolean;


}
</script>
<style scoped lang="scss">

</style>
