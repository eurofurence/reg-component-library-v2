import { create } from "@storybook/theming"

// import brand from '../src/assets/brand.svg'

export default create({
	base: "light",

	colorPrimary: "#016257",
	colorSecondary: "#020887",

	// UI
	appBg: "#F6F6FE",
	appContentBg: "#FFFFFF",
	appBorderColor: "#D0DCEC",
	appBorderRadius: 4,

	// Typography
	fontBase: '"Open Sans", sans-serif',
	fontCode: "monospace",

	// Text colors
	textColor: "black",
	textInverseColor: "#FFFFFF",

	// Toolbar default and active colors
	barTextColor: "#6F798D",
	barSelectedColor: "#2F3542",
	barBg: "#F6F6FE",

	// Form colors
	inputBg: "#FFFFFF",
	inputBorder: "#A4B1C6",
	inputTextColor: "#090D1F",
	inputBorderRadius: 4,

	brandTitle: "Eurofurence Reg",
	brandUrl: "https://eurofurence.org",
	//   brandImage: brand,
})
