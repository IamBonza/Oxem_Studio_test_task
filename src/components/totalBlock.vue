<template>
    <div class="total-block">
        <h2 class="total-block__title">{{title}}</h2>
        <div class="total-block__ammount">
            {{value.toLocaleString()}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'totalBlock',
        props: {
            title: String,
            value: Number
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    @import '../css/totalBlock.scss'
</style>