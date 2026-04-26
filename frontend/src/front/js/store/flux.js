import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			cf_url: 'http://localhost:3000', // Frontend URL
			cb_url: 'http://127.0.0.1:3001', // Backend URL
			condition: [],
			video: [],
		},
		actions: {
			// Updated to accept 'condition' as a parameter from the UI
			getCondition: async (conditionName) => {
				try {
					const response = await axios.get(`https://api.nhs.uk/mental-health/conditions/${conditionName}`, {
						headers: {
							'subscription-key': process.env.NHS_API_KEY
						}
					});
					setStore({ condition: response.data });
				} catch (error) {
					console.error("NHS API Error:", error);
				}
			},

			// Fixed: Now accepts 'searchTerm' directly from your search bar
			getVideo: async (searchTerm) => {
				try {
					const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
						params: {
							q: searchTerm,
							key: 'AIzaSyC2PlQqnTpfW5zcRsMGVabvkg31tZQesao',
							part: 'snippet',
							type: 'video'
						}
					});
					const videoId = response.data.items[0].id.videoId;
					setStore({ video: response.data.items });
					console.log("Found Video ID:", videoId);
				} catch (error) {
					console.error("YouTube API Error:", error);
				}
			},

			createUser: async (email, password) => {
				const store = getStore();
				const url = `${store.cb_url}/api/signup`;
				try {
					const response = await axios.post(url, { email, password });
					if (response.status === 200 && response.data.status === "true") {
						window.location.href = "/"; // Redirect to login
						return true;
					}
				} catch (error) {
					console.error("Signup Error:", error);
					alert("Error creating user.");
				}
				return false;
			},

			login: async (email, password) => {
				const store = getStore();
				const url = `${store.cb_url}/api/login`;
				try {
					const response = await axios.post(url, { email, password });
					if (response.status === 200) {
						const data = response.data;
						sessionStorage.setItem("token", data.access_token);
						setStore({
							token: data.access_token,
							user_name: data.user_name
						});
						return true;
					}
				} catch (error) {
					console.error("Login Error:", error);
					alert("Invalid credentials.");
				}
				return false;
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null });
				window.location.href = "/";
			},
		}
	};
};

export default getState;
