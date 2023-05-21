import { createTheme } from '@mui/material'

export const theme = createTheme({
	palette: {
		primary: { main: '#EFB500' },
		secondary: { main: '#DB0000' },
	},
	components: {
		MuiButton: {
			defaultProps: {
				variant: 'contained',
			},
		},
	},
})
