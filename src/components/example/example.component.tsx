import React, { memo, useState } from 'react';
import { ExampleModel } from '../../models/example.model';
import styles from './example.module.css';

type NcExampleProps = {
    model: ExampleModel;
    deleteExample?: (example: ExampleModel) => void;
    updateExample?: (example: ExampleModel) => void;
};

const NcExample = memo<NcExampleProps>(function NcExample({ model, deleteExample, updateExample }) {
    const { name } = model;
    const [edit, setEdit] = useState<boolean>();
    const [value, setValue] = useState(name);

    return edit ? (
        <>
            <input
                type='text'
                value={value}
                onChange={e => {
                    const value = e.target.value.trim();

                    if (value) setValue(value);
                }}
            />
            <button
                type='button'
                onClick={() => {
                    if (value) {
                        updateExample?.({ ...model, name: value });
                    }
                }}
            >
                Update
            </button>
            <button
                type='button'
                onClick={() => {
                    setEdit(false);
                }}
            >
                Cancel
            </button>
        </>
    ) : (
        <>
            <span className={styles.text}>{name}</span>
            <button
                onClick={() => {
                    setEdit(true);
                    setValue(name);
                }}
                type='button'
            >
                Edit
            </button>
            <button onClick={() => deleteExample?.(model)} type='button'>
                Delete
            </button>
        </>
    );
});

export default NcExample;
