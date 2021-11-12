<script>
    export default {
        props: {
            roomId: String,
            sender: String,
            senderName: String,
            message: String,
            senderAvatarUrl: String,
            time: String,
        },
    }
</script>

<template>
    <div class="mb-5">
        <!-- <div id="right" class="mr-2 w-5">
            <img class="w-5 h-5 rounded mr-3" :src=senderAvatarUrl alt="">
        </div>
        <div id="left">
            <div>{{ senderName }}</div>
            <div>{{ message }}</div>
        </div> -->
        <div class="flex">
            <img class="w-6 h-6 rounded mr-3" :src=senderAvatarUrl alt="">
            <div class="font-bold">{{ senderName }}</div>
        </div>
        
        <div class="ml-8">{{ message }}</div>
    </div>
</template>