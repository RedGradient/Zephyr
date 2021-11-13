<script>

    export default {
        methods: {
            sendMessage(event) {
                const message = document.getElementById('input').innerText;

                if (message === "" || !this.$parent.currentRoomId) {
                    return;
                }

                const content = {
                    "body": message,
                    "msgtype": "m.text"
                };
                
                this.$parent.client.sendEvent(this.$parent.currentRoomId, "m.room.message", content, "", (err, res) => {
                    console.log(err);
                });

                console.log('send click event');
                console.log(event);
                console.log(input);
                console.log(this.$parent.currentRoomId);
            }
        }
    }

</script>

<template>
    <div class="flex flex-col">
        <div class="flex mt-4">
            <div class="mr-4 ml-4">B</div>
            <div class="mr-4">I</div>
            <div class="mr-4">S</div>
            <div class="mr-4">Code</div>
            <div class="mr-4">""</div>
        </div>
        <div class="flex items-center justify-between">
            <div id="input" class="bg-white rounded w-full m-4 p-2 h-10" contenteditable="true"></div>
            <div class="mr-4 rounded-full bg-green-400 flex items-center justify-center font-bold cursor-pointer" @click="sendMessage">Send</div>
        </div>
    </div>
    
    
</template>