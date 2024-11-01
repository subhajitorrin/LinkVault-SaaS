import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from 'sonner';

const BASE_URL = process.env.SERVER_URL;
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const useZustStore = create(
    persist(
        (set, get) => ({
            todos: [],
            addTodo: async (
                todo: { url: string; title: string },
                setLoading: React.Dispatch<React.SetStateAction<boolean>>
            ) => {
                if (!todo.url) {
                    toast.error("Please enter a valid URL");
                    return;
                }
                setLoading(true);
                try {
                    const { data } = await api.post("/api/protected/todo", todo);
                    toast.success("Added to your list");
                    return data
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                    return error;
                } finally {
                    setLoading(false);
                }
            },
            getAllTodos: async (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
                try {
                    setLoading(true);
                    const { data } = await api.get("/api/protected/todo");
                    set({ todos: data.todos });
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                    return error;
                } finally {
                    setLoading(false);
                }
            }
        }),
        {
            name: "shop-inventory",
            partialize: (state) => ({
                todos: state.todos,
            }),
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useZustStore;