import { environmentService } from "../environmentService";

const resetPassService = async (token, newPasswordValue) => {
    const {urlBackend} = environmentService();

    const myHeaders = new Headers();
    myHeaders.append("api", "1ogC7RKV419Y5XssdtcvmuRJ8RcCu451a");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        'newPassword': newPasswordValue,
        'token': token
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const res = await fetch(`${urlBackend}/api/v1/auth/change-password`, requestOptions);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export { resetPassService };
