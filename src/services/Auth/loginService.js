const loginService = async (urlBackend, userValue, passValue) => {
    const myHeaders = new Headers();
    myHeaders.append("api", "1ogC7RKV419Y5XssdtcvmuRJ8RcCu451a");
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email": userValue,
        "password": passValue
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const res = await fetch(`${urlBackend}/api/v1/auth/login`, requestOptions);
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
}

export { loginService };