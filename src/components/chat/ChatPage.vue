<script>
import $ from 'jquery';
import { createApp, reactive, ref } from 'vue';
import RoomListItem from './RoomListItem.vue';
import TextArea from './TextArea.vue';
import ChatHeader from './ChatHeader.vue';
import Message from './Message.vue';

export default {

    components: {
        RoomListItem,
        ChatHeader,
        TextArea,
        Message,
    },

    data() {
        return {
            client: {
                type: Object,
                default: null
            },
            header: {
                type: Object,
                default: null
            },
            currentRoomId: {
                type: String,
                default: null
            },
            // messages: {
            //     type: Object,
            //     default: {m: []}
            // },
        }
    },

    props: {
        rooms: {
            type: Object,
            default: reactive([])
        },
    },

    methods: {

        setCurrentRoom(event) {

            // set room header
            // if (this.header) {
            //     this.header.unmount();
            // }
            try {
                this.header.unmount();
            } catch {

            }
            const CreateChatHeaderApp = () => createApp(ChatHeader, {
                roomId: event.roomId,
                roomName: event.roomName,
                roomAvatarUrl: event.roomAvatarUrl
            });
            this.header = CreateChatHeaderApp();
            this.header.mount('#chat-header');

            // hide old room messages and show actual messages

        },

        // Object.keys(client.store.rooms).forEach((roomId) => {
        //     client.getRoom(roomId).timeline.forEach(t => {
        //         console.log(t.event);
        //     });
        // });

        messageHandler(event) {
            // this.header.h && this.header.h.roomId === event.room_id
            if (this.currentRoomId && this.currentRoomId === event.room_id) {
                
                console.log('Event room_id'); console.log(event.room_id);
                const CreateMessageApp = () => createApp(Message, {
                    roomId: event.room_id,
                    sender: event.sender,
                    senderName: this.client.getUser(event.sender).displayName,
                    message: event.content.body,
                    senderAvatarUrl: this.client.mxcUrlToHttp(this.client.getUser(event.sender).avatarUrl),
                });

                const message = CreateMessageApp();

                const messages_div = document.getElementById('messages');
                const new_message_div = document.createElement('div');
                messages_div.append(new_message_div);

                message.mount(new_message_div);
            }
            //  else {
            //     // get room_id
            //     // update the room's notify counter
            //     // console.log('**** message won`t displayed ****');
            //     // console.log('currentHeader room_id'); console.log(this.currentHeader.h.roomId);
            //     // console.log('Event room_id'); console.log(event.room_id);
            // }
            

            // сравнение комнаты сообщения с текущей открытой комнатой
            // если true - выводим сообщения, если false - изменяем бейдж

            // console.log(event);
        }
    },

    setup(props) {
        console.log('--- in setup() ---');
        const selectTarget = (fromElement, selector) => {
            if (!(fromElement instanceof HTMLElement)) {
                return null;
            }

            return fromElement.querySelector(selector);
        };
        const resizeData = {
            tracking: false,
            startWidth: null,
            startCursorScreenX: null,
            handleWidth: 10,
            resizeTarget: null,
            parentElement: null,
            maxWidth: null,
        };
        $(document.body).on('mousedown', '#resize-handle', null, (event) => {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            
            const handleElement = event.currentTarget;

            if (!handleElement.parentElement) {
                console.error(new Error("Parent element not found."));
                return;
            }
            
            const targetSelector = handleElement.getAttribute('data-target');
            const targetElement = selectTarget(handleElement.parentElement, targetSelector);

            resizeData.startWidth = $(targetElement).outerWidth();
            resizeData.startCursorScreenX = event.screenX;
            resizeData.resizeTarget = targetElement;
            resizeData.parentElement = handleElement.parentElement;
            resizeData.maxWidth = $(handleElement.parentElement).innerWidth() - resizeData.handleWidth;
            resizeData.tracking = true;

            console.log('tracking started');
        });
        $(window).on('mousemove', (event) => {
            if (resizeData.tracking) {
                const cursorScreenXDelta = event.screenX - resizeData.startCursorScreenX;
                const newWidth = Math.min(resizeData.startWidth + cursorScreenXDelta, resizeData.maxWidth)

                $(resizeData.resizeTarget).outerWidth(newWidth);
            }
        })
        $(window).on('mouseup', (event) => {
            if (resizeData.tracking) {
                resizeData.tracking = false;

                console.log('tracking stopped');
            }
        })
    },

    created() {
        console.log('--- in created() ---');
        
        // if there is assess data in the localStore
        if (window.localStorage['baseUrl'] && window.localStorage['accessToken'] && window.localStorage['userId']) {
            console.log('-------------- Found data in the localStorage --------------');

            const baseUrl = window.localStorage['baseUrl'];
            const accessToken = window.localStorage['accessToken'];
            const userId = window.localStorage['userId'];

            // create client
            this.client = matrixcs.createClient({
                baseUrl,
                accessToken,
                userId
            });

            // listen to room events
            this.client.on("Room.timeline", (event, room, toStartOfTimeline) => {
                if (event.getType() === "m.room.message") {
                    console.log(event);
                    this.messageHandler(event.event);
                }
            });

            this.client.on('sync', (state, prevState, data) => {
                switch (state) {
                    // case "ERROR":
                    //     // update UI to say "Connection Lost"
                    //     break;
                    // case "SYNCING":
                    //     // update UI to remove any "Connection Lost" message

                    //     break;
                    case "PREPARED":
                        // the client instance is ready to be queried.
                        console.log('------------- PREPARED -------------');

                        this.client.store.getRooms().forEach((r) => this.rooms.push(r));
                        console.log('Rooms:'); console.log(this.rooms);

                        console.log('client.store.getRoom() for GNOME RU:');
                        console.log(this.client.store.getRoom('!IAOzRdBLqXVVKJlRZG:matrix.org')); // GNOME RU

                        // !OGEhHVWSdvArJzumhm:matrix.org

                        console.log('client:'); console.log(this.client);

                        break;
                }
            });
            
            // this.client.initCrypto()
            this.client.startClient();
        }
    },
}

</script>

<template>
    <div class="flex min-h-screen max-w-full">
        <aside id="left" class="bg-green-200 max-h-screen overflow-y-scroll w-64">
            <div class="">
                <RoomListItem @room-list-item-clicked="setCurrentRoom" v-for="room in rooms"
                    :key="room"

                    :roomId="room.roomId"
                    :roomName="room.name"
                    :roomAvatarUrl="room.getAvatarUrl(client.baseUrl)"
                    :roomNotificationCounts="room.notificationCounts.total"
                />
            </div>
        </aside>
        <div id="resize-handle" data-target='aside' class="cursor-resize flex items-center">|</div>
        <div id="right" class="bg-green-200 flex flex-1 flex-col">
            <div id="chat-header" class="bg-green-100"></div>
            <div id="messages" class="p-5 bg-green-50 flex-auto" style="overflow-y: auto; height: 0px"></div>
            <div class="bg-green-100">
                <TextArea />
            </div>
        </div>
    </div>
</template>