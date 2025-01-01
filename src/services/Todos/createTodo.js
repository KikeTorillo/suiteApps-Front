const createTodo = async (urlBackend, token, userId, text) => {
    const bearerToken = `Bearer ${token}`;
    const myHeaders = new Headers();
    myHeaders.append("api", "1ogC7RKV419Y5XssdtcvmuRJ8RcCu451a");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", bearerToken);

    let raw = JSON.stringify({
        "idUser": userId,
        "todo": text,
        "done": false
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    try {
        const res = await fetch(`${urlBackend}/api/v1/todos`, requestOptions);
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }


}

export { createTodo };