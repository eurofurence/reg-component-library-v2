/** @jsxImportSource @emotion/react */

import '../src/stylesheets/reset.css'
import '../src/stylesheets/colors.css'
import '../src/stylesheets/typography.css'
import '../src/stylesheets/globals.css'
import { useEffect } from 'react'
import { css } from '@emotion/react'

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
}

export const globalTypes = {
	browserFontSize: {
		name: 'Font Size',
		description: 'Browser font size',
		defaultValue: 16,
		toolbar: {
			icon: 'zoom',
			items: [
				{ value: 8, title: '8px' },
				{ value: 10, title: '10px' },
				{ value: 12, title: '12px' },
				{ value: 14, title: '14px' },
				{ value: 16, title: '16px' },
				{ value: 18, title: '18px' },
				{ value: 20, title: '20px' },
				{ value: 22, title: '22px' },
				{ value: 24, title: '24px' },
			]
		}
	},
	localFontSize: {
		name: 'Font Size',
		description: 'Local font size',
		defaultValue: null,
		toolbar: {
			icon: 'zoom',
			items: [
				{ value: null, title: '100%' },
				{ value: 8, title: '8px' },
				{ value: 10, title: '10px' },
				{ value: 12, title: '12px' },
				{ value: 14, title: '14px' },
				{ value: 16, title: '16px' },
				{ value: 18, title: '18px' },
				{ value: 20, title: '20px' },
				{ value: 22, title: '22px' },
				{ value: 24, title: '24px' },
			]
		}
	},
}

export const decorators = [
	(Story, { globals: { browserFontSize, localFontSize } }) => {
		useEffect(() => {
			document.querySelector('html').style.fontSize = `${browserFontSize * 0.625}px`
		})

		return <div style={localFontSize == null ? {} : { fontSize: `${localFontSize}px` }}><Story /></div>
	}
]
