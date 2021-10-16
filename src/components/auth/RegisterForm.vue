<script>


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
                    
                    <div class="flex justify-center mb-5">
                        <p class="text-3xl">Create account</p>
                    </div>

                    <!-- Entries -->
                    <input class="w-full mb-2 p-1 pl-3 rounded block bg-gray-100" type="text" value="matrix.org" placeholder="homeserver domain">
                    <input class="w-full mb-2 p-1 pl-3 rounded block bg-gray-100" type="text" placeholder="login">
                    <input class="w-full mb-2 p-1 pl-3 rounded block bg-gray-100" type="password" placeholder="password">
                    <input class="w-full mb-4 p-1 pl-3 rounded block bg-gray-100" type="password" placeholder="confirm password">
                    <span class="flex justify-center mt-1 mb-5 p-1 cursor-pointer hover:bg-green-500 rounded bg-green-300 block">Sign up</span>
                    
                    <hr class="mb-4">

                    <div class="flex justify-center">
                        <p class="text-gray-500">Already have an account? <span @click="$router.push({ name: 'LoginForm'})" class="cursor-pointer text-green-400 hover:text-green-600">Sign in</span></p>
                    </div>
                    
                        
                </div>
            </div>
        </div>
    </div>
</template>