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
            addTodo: async (todo: { url: string, title: string }) => {
                if (!todo.url) {
                    toast.error("Please enter a valid url");
                    return;
                }
                try {
                    const { data } = await api.post("/api/protected/todo", todo);
                    console.log(data);
                    toast.success("Added to your list");
                } catch (error: any) {
                    toast.error(error.message);
                    console.log(error);
                } finally {

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