import { ExampleModel } from '../../models/example.model';
import { commonApi } from '../common.api';

export const exampleApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchExampleList: build.query<ExampleModel[], number | void>({
            query: (limit: number = 5) => ({
                url: '/example',
                params: {
                    limit,
                },
            }),
            providesTags: result => [{ type: 'Example', id: 'List' }],
        }),
        createExample: build.mutation<ExampleModel, { example: Partial<ExampleModel> & { limit?: number } }>({
            query: ({ example }) => ({
                url: '/example',
                method: 'POST',
                body: example,
            }),
            async onQueryStarted({ example }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        exampleApi.util.updateQueryData('fetchExampleList', example.limit, draft => {
                            draft.unshift(data);
                        })
                    );
                } catch (e) {
                    console.error('userApi createUser error', e);
                }
            },
        }),
        updateExample: build.mutation<ExampleModel, { example: ExampleModel }>({
            query: ({ example }) => ({
                url: `/example`,
                method: 'PUT',
                body: example,
            }),
            invalidatesTags: ['Example'],
        }),
        deleteExample: build.mutation<ExampleModel, { example: ExampleModel }>({
            query: ({ example }) => ({
                url: `/example/${example.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Example'],
        }),
    }),
});
