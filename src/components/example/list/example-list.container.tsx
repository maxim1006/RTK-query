import React, { memo } from 'react';
import styles from './example-list.module.css';
import { useExampleList } from './example-list.hook';
import NcExample from '../example.component';

type ExamplesContainerProps = {};

const ExampleListContainer = memo<ExamplesContainerProps>(function ExamplesContainer() {
    const { ref, examples, loading, createExample, deleteExample, updateExample } = useExampleList();

    return (
        <div className={styles.host}>
            <h2>Example list</h2>
            <div className={styles.block}>
                <input type='text' ref={ref} />
                <button type='button' onClick={createExample}>
                    Add example
                </button>
            </div>
            <div className={styles.block}>
                {loading ? (
                    <>Loading...</>
                ) : (
                    <ul className={styles.list}>
                        {examples.map(example => (
                            <li className={styles.listItem} key={example.id}>
                                <NcExample
                                    model={example}
                                    updateExample={updateExample}
                                    deleteExample={deleteExample}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
});

export default ExampleListContainer;
