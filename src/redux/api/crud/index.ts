import { api as index } from "..";
import { CRUD } from "./types";

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTodos: builder.query<CRUD.GetCrudResponse, CRUD.GetCrudRequest>({
			query: () => ({
				url: "",
				method: "GET",
			}),
			providesTags: ["crud"],
		}),
		createTodo: builder.mutation<
			CRUD.CreateCrudResponse,
			CRUD.CreateCrudRequest
		>({
			query: ({ firstName, lastName }) => ({
				url: "",
				method: "POST",
				body: { firstName, lastName },
			}),
			invalidatesTags: ["crud"],
		}),
		createDeleteTodo: builder.mutation<
			CRUD.DeleteCrudResponse,
			CRUD.DeleteCrudRequest
		>({
			query: ({ _id }) => ({
				url: `${_id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["crud"],
		}),
		editTodo: builder.mutation<CRUD.EditCrudResponse, CRUD.EditCrudRequest>({
			query: ({ _id, newData }) => ({
				url: `${_id}`,
				method: "PUT", // Use PUT or another appropriate HTTP method
				body: newData,
			}),
			invalidatesTags: ["crud"],
		}),
	}),
});

export const {
	useGetTodosQuery,
	useCreateTodoMutation,
	useCreateDeleteTodoMutation,
	useEditTodoMutation, // Add the useEditTodoMutation hook
} = api;
