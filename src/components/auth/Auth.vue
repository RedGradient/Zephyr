<script setup>
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
</script>


<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div class="p-6 bg-white rounded-md shadow">
            <router-view></router-view>
        </div>
    </div>
</template>