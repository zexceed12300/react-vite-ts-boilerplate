import api from "../services/api";
import { User } from "../types/user";

export const userLoader = async ({ search = "", limit = 20 }) => {
	try {
		const res = await api.get("/user", {
			params: {
				search: search,
				limit: limit,
			},
		});

		const { bughosts } = res.data;

		const options = bughosts.map((val: User) => ({
			value: val.id,
			label: `#${val.id} - ${val.name}`,
		}));

		return options;
	} catch (err) {
		console.log(err);
		const error = err;
		throw error;
	}
};