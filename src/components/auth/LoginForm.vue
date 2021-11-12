<script setup>

import router from '../../routes/index.js';

function handleChange(event) {
    console.log('Switching language...');
    localStorage.setItem('lang', event.target.value);
    // window.location.reload();
}

function getHomeServer(homeserver) {
    if (homeserver.startsWith('https://')) return homeserver;
    return 'https://' + homeserver;
}

function getUserId(userId, homeserver) {
    if (homeserver.startsWith('https://')) homeserver = homeserver.split('https://')[1];
    if (userId.startsWith('@') && userId.endsWith(':' + homeserver)) return userId;
    return '@' + userId + ':' + homeserver;
}

function login(event) {
    console.log("Login...");

    const homeserver = this.getHomeServer(document.getElementById('homeserver').value);
    const userId = this.getUserId(document.getElementById('user-id').value, homeserver);
    const password = document.getElementById('password').value;
    
    const client = matrixcs.createClient(homeserver);

    client.login("m.login.password", {"user": userId, "password": password}).then(
        result => {
            console.log("Access token: " + result.access_token);

            // save data to localStorage
            localStorage.setItem("baseUrl", homeserver);
            localStorage.setItem("accessToken", result.access_token);
            localStorage.setItem("userId", userId);
            
            console.log("Success!");

            // open chat page
            router.push({ name: 'ChatPage'});
        },

        error => {
            console.error(error);
        },
    );

}

function handleHomeserverChange(event) {
    console.log('*');
}

</script>


<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div class="p-6 bg-white rounded-md shadow">
            <!-- Form Content -->
            <div class="flex justify-center items-center w-80">
                <div class="w-96">
                    <!-- Logo -->
                    <div class="flex justify-center mb-10">
                        <p class="text-5xl font-extrabold text-purple-500">Logo</p>
                    </div>
                    
                    <!-- Language Selector -->
                    <div class="flex justify-center mb-10">
                        <select class="p-2 pr-4 rounded bg-gray-200" @change="handleChange($event)" name="lang" id="">
                            <option value="en">English</option>
                            <option value="ru">Русский</option>
                        </select>
                    </div>
                    

                    <!-- Entries -->
                    <input @change="handleHomeserverChange(event)" id="homeserver" class="w-full mb-2 p-1 pl-3 rounded block bg-gray-100" type="text" value="matrix.org" placeholder="homeserver domain">
                    <input id="user-id" class="w-full mb-2 p-1 pl-3 rounded block bg-gray-100" type="text" placeholder="login">
                    <input id="password" class="w-full mb-4 p-1 pl-3 rounded block bg-gray-100" type="password" placeholder="password">

                    <span class="flex justify-center mt-1 mb-5 p-1 cursor-pointer hover:bg-green-500 rounded bg-green-300 block" @click="login($event)">Sign in</span>
                    
                    <hr class="mb-4">
                    
                    <div class="flex justify-center">
                        <p class="text-gray-500">Don't have an account yet? <span @click="$router.push({ name: 'RegisterForm'})" class="cursor-pointer text-green-400 hover:text-green-600">Create account</span></p>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
</template>