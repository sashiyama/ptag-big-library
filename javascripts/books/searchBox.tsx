import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

export const SearchBox = () => {
  const [keyword, setKeyword] = React.useState<string>('')

  return (
    <Paper
      component="form"
      sx={{
        mb: 3,
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        bgcolor: 'primary.dark',
      }}
      elevation={12}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search books by title, author, genre, and sub genre"
        inputProps={{ 'aria-label': 'search book' }}
        autoFocus
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
      />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        href={`?keyword=${keyword}`}
      >
        <SearchIcon color="secondary" />
      </IconButton>
    </Paper>
  )
}
