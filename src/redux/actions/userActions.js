export const userLoggedIn = (userName, fullName) => (
	{
		type: 'SET_USER',
		loggedUser: {
            userName: userName,
            fullName: fullName
		},
	}
);