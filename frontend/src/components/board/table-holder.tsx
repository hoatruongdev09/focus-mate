import { SortableContext } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import ColumnContainer from './column/column-container';
import { List, Card } from '../../types/board.type';
import NewColumnCreator from './new-column-creator';

// ...existing code...
interface TableItem {
    column: List;
    tasks: Card[];
}

interface Props {
    table: TableItem[]
    setColumnRef: (id: number, node: HTMLElement) => void
    columnsId: string[]
}

const TableHolder = (props: Props) => {
    const { table, setColumnRef, columnsId } = props

    return (
        <div className="flex flex-1 gap-2 h-full z-10">
            <div className="flex gap-4 h-full justify-start items-start">
                <SortableContext items={columnsId}>
                    {
                        table.map(item =>
                            <ColumnContainer
                                key={`col-${item.column.id}`}
                                column={item.column}
                                setRef={setColumnRef}
                                tasks={item.tasks}
                            />
                        )
                    }
                </SortableContext>
                <NewColumnCreator />
            </div>
        </div>
    );
};

export default TableHolder;