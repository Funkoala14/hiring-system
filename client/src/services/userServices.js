import { get, post } from "./api";

export const getUser = async () => {
    const response = await get("/user");
    const { data, code, message } = response;
    return data;
};

export const getEmployeeInfoByUserId = async (config) => {
    try {
        const response = await post("/user/info", config);
        const { data, code, message } = response;
        return data;
    } catch (error) {
        console.error("Caught Error:", error.message);
    }
};
