<script>
// TODO: адаптивность

export default {
    name: 'RoomListItem',

    props: {
        roomId: String,
        roomName: String,
        roomNotificationCounts: Number,
        roomAvatarUrl: String,
    },

    methods: {
        selectRoom() {
            this.$emit('roomListItemClicked', {
                roomId: this.roomId,
                roomName: this.roomName,
                roomAvatarUrl: this.roomAvatarUrl
            });
        },
    }
}
</script>

<template>
    <div class="flex items-center justify-between h-14 p-1 pl-3 pr-3 hover:bg-green-400 cursor-pointer" @click="selectRoom">
        <div class="flex items-center">
            <!-- :alt=this.room.name -->
            <!-- room.getAvatarUrl(room.client.getHomeserverUrl()) -->
            <img class="rounded mr-3 w-8 h-8" :src=roomAvatarUrl >
            <span>{{ roomName }}</span>
        </div>
        <div v-if="roomNotificationCounts > 0" class="bg-gray-500 flex text-white font-bold justify-center items-center h-4 pl-1 pr-1 rounded-full text-xs">
            {{ roomNotificationCounts }}
        </div>
    </div>
</template>