import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			cf_url: 'http://localhost:3000',
			cb_url: 'http://127.0.0.1:3001',

			condition: null,
			conditionDetails: [],
			video: [],

			loading: false,
			error: null
		},

		actions: {

			// ✅ NEW: Wikipedia-based condition search
			getCondition: async (conditionName) => {
				if (!conditionName) return;

				setStore({ loading: true, error: null });

				try {
					const formatted = conditionName.trim().replace(/\s+/g, "_");

					const response = await axios.get(
						`https://en.wikipedia.org/api/rest_v1/page/summary/${formatted}`
					);

					// Normalize data so your UI is consistent
					const conditionData = {
						title: response.data.title,
						description: response.data.extract,
						url: response.data.content_urls?.desktop?.page
					};

					setStore({
						condition: conditionData,
						loading: false
					});

				} catch (error) {
					console.error("Wiki API Error:", error);
					setStore({
						condition: null,
						error: "Condition not found. Try something like 'anxiety' or 'depression'.",
						loading: false
					});
				}
			},

			// ✅ NEW: Fetch deeper sections (like symptoms/treatment-ish content)
			getConditionDetails: async (conditionName) => {
				if (!conditionName) return;

				try {
					const formatted = conditionName.trim().replace(/\s+/g, "_");

					const response = await axios.get(
						`https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${formatted}`
					);

					const sections = response.data?.lead?.sections || [];

					setStore({
						conditionDetails: sections.slice(0, 4) // limit for UI cleanliness
					});

				} catch (error) {
					console.error("Details Error:", error);
				}
			},

			// 🔧 Slight cleanup: don't hardcode API key in production
			getVideo: async (searchTerm) => {
				try {
					const response = await axios.get(
						'https://www.googleapis.com/youtube/v3/search',
						{
							params: {
								q: searchTerm,
								key: process.env.REACT_APP_YOUTUBE_KEY,
								part: 'snippet',
								type: 'video',
								maxResults: 3
							}
						}
					);

					setStore({ video: response.data.items });

				} catch (error) {
					console.error("YouTube API Error:", error);
				}
			},

			createUser: async (email, password) => {
				const store = getStore();
				try {
					const response = await axios.post(
						`${store.cb_url}/api/signup`,
						{ email, password }
					);

					if (response.status === 200 && response.data.status === "true") {
						window.location.href = "/";
						return true;
					}
				} catch (error) {
					console.error("Signup Error:", error);
				}
				return false;
			},

			login: async (email, password) => {
				const store = getStore();
				try {
					const response = await axios.post(
						`${store.cb_url}/api/login`,
						{ email, password }
					);

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