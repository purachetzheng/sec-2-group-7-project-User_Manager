<script setup>

</script>
 
<template>
    <div>
        <div>
            <router-link :to="{ name: 'Home' }">Home</router-link> |
            <router-link :to="{ name: 'TableManager' }">Table Manager</router-link>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
 
<style>
a {
    color: aqua;
}
.router-link-active {
    color: orange;
}
</style>