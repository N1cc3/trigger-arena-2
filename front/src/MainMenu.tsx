import { Button } from '@mui/material'
import { theme } from './theme'
import { ThemeProvider, Box, useTheme } from '@mui/material'
import { ComponentProps } from 'react'
import { css, Global, keyframes } from '@emotion/react'
import scratches from './assets/scratches.jpg'
import phaser3 from './assets/phaser3-logo.png'

export const MainMenu = () => {
	return (
		<ThemeProvider theme={theme}>
			<VBox
				sx={{
					bgcolor: 'black',
				}}
			>
				<VBox
					sx={{
						overflow: 'hidden',
						bgcolor: 'primary.main',
						maskImage: `url('${phaser3}')`,
						maskSize: '100% 100%',
					}}
				>
					<Stripes />
					<HBox>
						<Triangle onClick={() => alert('host')}>Host</Triangle>
						<Triangle onClick={() => alert('join')}>Join</Triangle>
					</HBox>
					<Stripes reverse />
				</VBox>
			</VBox>
		</ThemeProvider>
	)
}

const stripesCss = `linear-gradient(
	90deg,
	#000000 30%,
	transparent 30%,
	transparent 75%,
	#000000 75%
)`

const move = keyframes`
  from { transform: translateX(0px); }
  to { transform: translateX(255px); }
`

const Stripes = ({ reverse }: { reverse?: boolean }) => (
	<HBox
		sx={{
			overflow: 'hidden',
			height: '30%',
			width: '200vw',
			animation: `${move} 2s linear infinite`,
			animationDirection: reverse ? 'reverse' : 'normal',
		}}
	>
		<HBox
			sx={{
				background: stripesCss,
				transform: 'rotate(45deg)',
				backgroundSize: 180,
				height: 10_000,
			}}
		/>
	</HBox>
)

const Triangle = ({ children, onClick }: { children: string; onClick: () => void }) => {
	const theme = useTheme()
	const { main, light, dark } = theme.palette.primary
	return (
		<>
			<Global styles={{ '.triangle': { fill: main, ':hover': { fill: light }, ':active': { fill: dark } } }} />
			<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M2.39019 18.0983L10.6151 3.89171C11.0696 3.10655 11.2969 2.71396 11.5935 2.58211C11.8521 2.4671 12.1474 2.4671 12.4061 2.58211C12.7026 2.71396 12.9299 3.10654 13.3844 3.89171L21.6093 18.0983C22.0655 18.8863 22.2936 19.2803 22.2599 19.6037C22.2305 19.8857 22.0827 20.142 21.8534 20.3088C21.5904 20.5 21.1352 20.5 20.2246 20.5H3.77487C2.86435 20.5 2.40908 20.5 2.14613 20.3088C1.91677 20.142 1.769 19.8857 1.73959 19.6037C1.70588 19.2803 1.93398 18.8863 2.39019 18.0983Z"
					stroke="#000000"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="triangle"
					onClick={onClick}
				/>
				<text
					x="50%"
					y="75%"
					font-size="5px"
					font-family="WarElite"
					text-anchor="middle"
					fill="black"
					style={{ userSelect: 'none', pointerEvents: 'none' }}
				>
					{children}
				</text>
			</svg>
		</>
	)
}

const MenuButton = (props: ComponentProps<typeof Button>) => (
	<Button color="secondary" sx={{ minWidth: '20%', minHeight: '10%', fontSize: 60 }} {...props} />
)

const HBox = (props: ComponentProps<typeof Box>) => (
	<Box width="100%" height="100%" display="flex" justifyContent="space-evenly" alignItems="center" {...props} />
)

const VBox = (props: ComponentProps<typeof Box>) => <HBox flexDirection="column" {...props} />
