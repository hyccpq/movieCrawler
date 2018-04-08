<template>
    <div>
        <input type="text" v-model="sth">{{ sth }}
    </div>
</template>

<script>
export default {
    name: "App",
    data(){
        return {
            sth:''
        }
    }
}
</script>

<style scoped>

</style>