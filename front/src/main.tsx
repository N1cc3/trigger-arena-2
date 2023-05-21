import React from 'react'
import ReactDOM from 'react-dom/client'
import { MainMenu } from './MainMenu'
import './index.css'

ReactDOM.createRoot(document.getElementById('ui') as HTMLElement).render(
	<React.StrictMode>
		<MainMenu />
	</React.StrictMode>
)
