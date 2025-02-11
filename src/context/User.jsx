import { useReducer, createContext, useEffect } from 'react';

export const UserAuthContext = createContext();
const reducerFn = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				user: null,
			};
		case 'PROFILEIMAGE':
			state.user.image = action.payload;
			return {
				user: state.user,
			};
	}
};
export const UserAuthContextProvider = ({ children }) => {
	useEffect(() => {
		let user = localStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			dispatch({ type: 'LOGIN', payload: user });
			return;
		}
	}, []);
	const [state, dispatch] = useReducer(reducerFn, {
		user: null,
	});
	return (
		<UserAuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</UserAuthContext.Provider>
	);
};
