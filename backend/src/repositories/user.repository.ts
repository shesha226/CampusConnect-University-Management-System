import User from "../models/User";


export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
};

export const findUserById = async(id: string) => {
    return await User.findById(id);
}


export const createUser = async (userData: {
    username: string;
    email: string;
    password: string;
    role: string;
}) => {
    return await User.create(userData);
};