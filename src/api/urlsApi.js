export const addUrl = async (url, username) => {
    try {
        const rawResponse = await fetch('http://localhost:5000/urls/addUrl', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: username, url: url })
        });
        const content = await rawResponse.json();
        return content;
    }
    catch (e) {
        return e;
    }
};

export const getUrls = async (userName) => {

    try {
        const res = await fetch(`http://localhost:5000/urls/getUrls/${userName}`);
        const content = await res.json();
        return content;
    } catch (e) {
        return e;
    }
};

export const startStreaming = async (url) => {
    try {
        const rawResponse = await fetch('http://localhost:5000/urls/startStreaming', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: url})
        });
        const content = await rawResponse.json();
        return content;
    }
    catch (e) {
        return e;
    }
};
