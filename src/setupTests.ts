import "@testing-library/jest-dom"

import { createSerializer } from "@emotion/jest"
import { cleanup } from "@testing-library/react"

// Configure cleanup after each test
afterEach(() => {
	cleanup()
})

// Add emotion serializer
expect.addSnapshotSerializer(createSerializer())
