<script>
export default {
    props: {
        roomId: String,
        roomName: String,
        roomAvatarUrl: String,
    },

    expose: ['roomId']
}
</script>


<template>
    <header class="flex items-center justify-between h-10">
        <div class="flex items-center m-3">
            <img class="rounded w-8 h-8 mr-4" :src=roomAvatarUrl alt="">
            <span>{{ roomName }}</span>
        </div>
        <div class="flex">
            <div class="m-3"></div>
            <div class="m-3"></div>
            <div class="m-3"></div>
        </div>
    </header>
</template>