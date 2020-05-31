<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="App">
        <h1>缓存版</h1>
        <test>
            <template v-slot:three="{row}">
                <span style="color: red">{{row}}</span>
            </template>
        </test>
        <h1>非缓存版</h1>
        <test1>
            <template v-slot:three="{row}">
                <span style="color: red">{{row}}</span>
            </template>
        </test1>
    </div>
</template>

<script>
    import test from './components/test'
    import test1 from './components/test1'

    export default {
        name: "app",
        components: {
            test,
            test1
        },
    }
</script>

<style>
</style>
