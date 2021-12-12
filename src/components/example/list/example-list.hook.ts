import { useCallback, useRef } from 'react';
import { ExampleModel } from '../../../models/example.model';
import { exampleApi } from '../../../store/example/example.api';

export function useExampleList() {
    const { data: examples = [], isLoading: examplesLoading } = exampleApi.useFetchExampleListQuery();
    const [createExampleMutation, { isLoading: createExampleLoading }] = exampleApi.useCreateExampleMutation();
    const [deleteExampleMutation, { isLoading: deleteExampleLoading }] = exampleApi.useDeleteExampleMutation();
    const [updateExampleMutation, { isLoading: updateExampleLoading }] = exampleApi.useUpdateExampleMutation();

    const ref = useRef<HTMLInputElement>(null);

    const loading = examplesLoading || createExampleLoading || deleteExampleLoading || updateExampleLoading;

    const createExample = useCallback(() => {
        const value = ref.current?.value.trim();

        if (value)
            createExampleMutation({
                example: { name: value },
            });
    }, [createExampleMutation]);

    const updateExample = useCallback(
        (example: ExampleModel) => updateExampleMutation({ example }),
        [updateExampleMutation]
    );

    const deleteExample = useCallback(
        (example: ExampleModel) => deleteExampleMutation({ example }),
        [deleteExampleMutation]
    );

    return {
        ref,
        examples,
        loading,
        createExample,
        updateExample,
        deleteExample,
    };
}
