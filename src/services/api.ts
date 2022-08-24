export async function fetchAPI<TResponse>(path: RequestInfo | URL, init?: RequestInit & { token?: string }) {
    const initFetch = init ?? {};
    const url = `http://localhost:5000${path}`

    initFetch.headers = {
        ...initFetch.headers,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }

    if (init?.token) {
        initFetch.headers = {
            ...initFetch?.headers,
            authorization: `Bearer ${init.token}`
        }
    }

    return fetch(url, initFetch).then(async (res) => {
        const data = await res.json() as TResponse;
        return data;
    });
}