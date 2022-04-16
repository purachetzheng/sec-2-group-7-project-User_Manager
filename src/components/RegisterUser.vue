<script setup>
import {computed} from 'vue'
defineEmits(['createUser', 'cancelRegister'])
const props = defineProps({
    currentUser:{
        type: Object,
        default: {}
    }
})

const newUser = computed(() =>{
    return {id: props.currentUser.id, username: props.currentUser.username, password: props.currentUser.password}
})
</script>
 
<template>
    <h1>Register User</h1>
    <div>
        <label>Username: </label>
        <input id = "usernameText" type="text" placeholder="type your username here..." v-model = "newUser.username"/>
    </div>
    <div>
        <label>Password: </label>
        <input id = "passwordText" type="password" placeholder="type your password here..." v-model = "newUser.password"/>
    </div>
    <div>
        <button @click = "$emit('createUser', newUser.username, newUser.password)">register</button>
        <button @click = "$emit('cancelRegister', $event)">cancel</button>
    </div>
</template>
 
<style>

</style>