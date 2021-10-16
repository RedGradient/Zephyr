<script setup>

function handleChange(event) {
    console.log('Switching language...');
    localStorage.setItem('lang', event.target.value);
    // window.location.reload();
}

function login(event) {
    console.log("Login...");

    const homeserver = document.getElementById('homeserver').value;
    const user_id = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;

    // сделать поддержку ввода с https://
    const client = matrixcs.createClient("https://" + homeserver);

    client.login("m.login.password", {"user": user_id, "password": password}).then(
        result => {
            console.log("Access token: " + result.access_token);
            localStorage.setItem("token", result.access_token);
            console.log("Success!");
        },

        error => {
            console.error(error);
        },
    );

    // client.sync()
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