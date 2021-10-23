class Client {
    constructor(user_id, password, homeserver) {
        if (typeof Client.instance === 'object') {
            return Client.instance;
        }

        // create client with user_id and password
        Client.instance = matrixcs.createClient(homeserver);
        Client.instance.login("m.login.password", {"user": user_id, "password": password}).then(
            result => {
                console.log("Access token: " + result.access_token);

                localStorage.setItem("token", result.access_token);

                console.log("Access token has been stored to localStorage");
                console.log("Success!");
            },
        
            error => {
                console.error(error);
            },
        );

        return this;
    }
}

export default Client;
