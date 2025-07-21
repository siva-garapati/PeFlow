import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';


export default function TransactionsTable({ data }) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <Typography>No data available</Typography>;
    }

    const rowsWithId = data.map((row, index) => ({
        id: row.id || index + 1,
        ...row,
    }));

    const columns = Object.keys(rowsWithId[0])
        .filter((key) => key !== 'id')
        .map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            width: 180,
            sortable: true,
        }));

    return (
        <Box sx={{ width: '100%'}}>
            {/* <Typography variant="h5" gutterBottom>{title}</Typography> */}
            <Box sx={{ height: 500 }}>
                <DataGrid
                    rows={rowsWithId}
                    columns={columns}
                    pageSize={100}
                    hideFooterPagination
                    disableRowSelectionOnClick
                    checkboxSelection={false}
                    isRowSelectable={() => false}
                    hideFooterSelectedRowCount
                    // onRowClick={onRowClick} // ✅ handle row click
                />
            </Box>
        </Box>
    );
}
