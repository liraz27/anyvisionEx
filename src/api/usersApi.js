export const checkUserNameValid = async (userName) => {

    try {
        const res = await fetch(`http://localhost:5000/users/checkIfUserExist/${userName}`);
        const content = await res.json();
        return content;
    } catch (e) {
        return e;
    }
};

export const addUser = async (fullname, username, password) => {
    try {
        const rawResponse = await fetch('http://localhost:5000/users/newUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName: fullname, userName: username, password: password })
        });
        const content = await rawResponse.json();
        return content;
    }
    catch (e) {
        return e;
    }
};

// check if the user exist in our DB with this username and password
// if exist return his full name, else return false
export const login = async (userName, password) => {
    try {
        const rawResponse = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: userName, password: password })
        });
        const content = await rawResponse.json();
        if (content) {
            return content.fullName;
        }
        return false;
    }
    catch (e) {
        return e;
    }
}