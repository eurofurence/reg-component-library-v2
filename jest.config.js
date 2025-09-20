module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	transform: {
		"^.+\\.(ts|tsx)$": [
			"babel-jest",
			{
				presets: [
					["@babel/preset-env", { targets: { node: "current" } }],
					[
						"@babel/preset-react",
						{ runtime: "automatic", importSource: "@emotion/react" },
					],
					"@babel/preset-typescript",
				],
			},
		],
	},
	transformIgnorePatterns: ["node_modules/(?!(@testing-library|@emotion)/)"],
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	testMatch: [
		"<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
		"<rootDir>/src/**/*.{test,spec}.{ts,tsx}",
	],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.stories.{ts,tsx}",
		"!src/**/*.test.{ts,tsx}",
		"!src/**/__snapshots__/**",
	],
}
