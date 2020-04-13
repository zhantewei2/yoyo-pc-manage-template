<template>
    <div>tempalte21
        <article>2</article>
        <pre>
        <code>
            console.log(&quot;dfd&quot;);
s
        </code>
        </pre>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
@Component({})
export default class extends Vue{
    mounted(){
        console.log("mounted");
    }
}
</script>
<style lang="scss" scoped>
    article{
        color:black;
        border:1px solid gainsboro;
    }
</style>