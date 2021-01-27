import React from 'react'

// this is Filter property on TransactionTable
export const TableGlobalFilter = ({filter, setFilter}) => {
    return (
        <span>
            Search: {' '}
            <input value={filter}
            onChange={(e)=>setFilter(e.target.value)}/>
        </span>
    )
}
