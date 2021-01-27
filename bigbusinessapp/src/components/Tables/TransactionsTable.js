import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import DataTransaction from './mock_data.json'
import { COLUMNS } from './TableColumn';
import './../Tables/TableCss.css';
import { TableGlobalFilter } from './TableGlobalFilter';

export const TransactionsTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => DataTransaction, []);

    const tableInstance = useTable({ //useTable takes in columns, json data and returns an TableInstance
        columns,
        data
    }, useGlobalFilter, useSortBy)

    //props from TableInstance
    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter } = tableInstance;

    const { globalfilter } = state; //globalfilter prop


    return (
        <> 
            <TableGlobalFilter filter={globalfilter} setFilter={setGlobalFilter} /> 
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? '🔼 ' : '🔽 ') : ''}
                                    </span>
                                </th>
                            ))
                            }
                        </tr>
                    ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    { row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                    }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </>
    )
}
