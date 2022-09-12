import * as React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

import { IHistory } from './show'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'

const columns: GridColDef[] = [
  {
    field: 'username',
    headerName: 'Name',
    width: 260,
    disableColumnMenu: true,
    disableReorder: true,
    hideSortIcons: true,
    sortable: false,
  },
  {
    field: 'checked_out_at',
    headerName: 'Date of checked out',
    width: 260,
    disableColumnMenu: true,
    disableReorder: true,
    hideSortIcons: true,
    sortable: false,
  },
  {
    field: 'retured_at',
    headerName: 'Date of retured',
    width: 260,
    disableColumnMenu: true,
    disableReorder: true,
    hideSortIcons: true,
    sortable: false,
  },
]

export const BookHistoryTable: React.FC<{
  history: IHistory[]
  pages: number
  page: number
}> = ({ history, pages, page }) => {
  return (
    <div style={{ height: 400, width: '60%', marginTop: 20 }}>
      <DataGrid
        rows={history}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={pages}
          variant="outlined"
          color="secondary"
          page={page}
          onChange={(e, page) => {
            window.location.href = `?page=${page}`
          }}
        />
      </Box>
    </div>
  )
}
