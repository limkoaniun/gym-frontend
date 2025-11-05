import api from '../axios';
import {toast} from 'react-toastify';
import {AxiosError} from 'axios';

import {LoginPayload, LoginResponse, SignupPayload} from '../interfaces';

export const login = async (data: LoginPayload): Promise<LoginResponse | null> => {
    try {
        const res = await api.post('/auth/login', data);
        return res.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                toast.error("Invalid email or password.", {
                    position: "top-center",
                    toastId: "login-failed",
                });
            } else {
                toast.error(error.response?.data?.message || "Something went wrong.", {
                    position: "top-center",
                    toastId: "login-error",
                });
            }
        } else {
            toast.error("Something went wrong.", {
                position: "top-center",
                toastId: "login-error",
            });
        }
        return null;
    }
};

export const signup = async (data: SignupPayload): Promise<SignupPayload | null> => {
    try {
        const res = await api.post('/players', data);
        return res.data;
    } catch (error: unknown) {
        console.error('Signup error:', error);
        toast.error("Signup failed. Please try again.", {
            position: "top-center",
            toastId: "signup-error",
        });
        return null;
    }
};