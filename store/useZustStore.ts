/* eslint-disable @typescript-eslint/ban-ts-comment */


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = process.env.SERVER_URL;
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

const useZustStore = create(
    persist(
        (set, get) => ({
            user: null,
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
                    console.log(data);
                    //@ts-ignore
                    await get().getAllTodos(setLoading);
                    //@ts-ignore
                    await get().getUser();
                    toast.success("Added to your list");
                    return data;
                } catch (error: unknown) {
                    console.log(error);
                    toast.error("Something went wrong");
                    return error;
                } finally {
                    setLoading(false);
                }
            },
            getAllTodos: async (
                setLoading: React.Dispatch<React.SetStateAction<boolean>>
            ) => {
                try {
                    setLoading(true);
                    const { data } = await api.get("/api/protected/todo");
                    set({ todos: data.todos });
                } catch (error: unknown) {
                    console.log(error);
                    toast.error("Something went wrong");
                    return error;
                } finally {
                    setLoading(false);
                }
            },
            deleteTodo: async (
                id: string,
                setLoading: React.Dispatch<React.SetStateAction<boolean>>
            ) => {
                try {
                    setLoading(true);
                    const { data } = await api.delete(`/api/protected/todo/${id}`);
                    //@ts-ignore
                    await get().getUser();
                    //@ts-ignore
                    await get().getAllTodos(setLoading);
                    toast.success("Deleted from your list");
                    return data;
                } catch (error: unknown) {
                    console.log(error);
                    toast.error("Something went wrong");
                    return error;
                } finally {
                    setLoading(false);
                }
            },
            updateTodo: async (
                id: string,
                link: string,
                title: string,
                setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
            ) => {
                try {
                    setIsLoading(true);
                    const { data } = await api.put(`/api/protected/todo/${id}`, {
                        link,
                        title
                    });
                    //@ts-ignore
                    await get().getAllTodos(setIsLoading);
                    toast.success("Updated successfully");
                    return data;
                } catch (error: unknown) {
                    console.log();
                    toast.error("Something went wrong");
                    return error;
                } finally {
                    setIsLoading(false);
                }
            },
            getUser: async () => {
                try {
                    const { data } = await api.get("/api/protected/user");
                    set({ user: data.user });
                } catch (error: unknown) {
                    console.log(error);
                    toast.error("Something went wrong");
                    return error;
                }
            }
        }),
        {
            name: "linkVaultStore",
            partialize: (state) => ({
                //@ts-ignore
                user: state.user
            }),
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

export default useZustStore;
