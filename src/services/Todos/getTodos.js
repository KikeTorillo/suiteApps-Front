const getTodos = async (urlBackend, userId) => {
    const myHeaders = new Headers();
    myHeaders.append("api", "1ogC7RKV419Y5XssdtcvmuRJ8RcCu451a");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: 'include'
    };
    try {
        const res = await fetch(`${urlBackend}/api/v1/todos/${userId}`, requestOptions);
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
}

export { getTodos };
