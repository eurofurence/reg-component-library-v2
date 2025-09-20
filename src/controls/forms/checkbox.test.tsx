/** @jsxImportSource @emotion/react */

import { render } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import * as fc from "fast-check"
import renderer from "react-test-renderer"

import Checkbox from "./checkbox"

describe("Checkbox", () => {
	it("renders correctly", () => {
		fc.assert(
			fc.property(
				fc.option(fc.string({ unit: "grapheme" }), { nil: undefined }),
				fc.boolean(),
				(label, checked) => {
					const tree = renderer
						.create(
							<Checkbox name="am-furry" label={label} checked={checked} />
						)
						.toJSON()

					expect(tree).toMatchSnapshot()
				}
			),
			{ numRuns: 20, seed: 2562346 }
		)
	})

	it("has a label if one is provided", () => {
		const { queryByLabelText } = render(
			<Checkbox name="am-furry" label="I am a furry" />
		)

		expect(queryByLabelText("I am a furry")).toBeTruthy()
	})

	it("does not have a label if none is provided", () => {
		const { container } = render(<Checkbox name="am-furry" />)

		expect(container.querySelector("label")).toBeFalsy()
	})

	describe("when controlled", () => {
		it("reflects the input value at all times (true)", async () => {
			const onChange = jest.fn()
			const { getByRole } = render(
				<Checkbox
					name="am-furry"
					label="I am a furry"
					checked={true}
					onChange={onChange}
				/>
			)

			const checkbox = getByRole("checkbox")

			expect(checkbox).toBeChecked()

			await userEvent.click(checkbox)

			expect(checkbox).toBeChecked()
		})

		it("reflects the input value at all times (false)", async () => {
			const onChange = jest.fn()
			const { getByRole } = render(
				<Checkbox
					name="am-furry"
					label="I am a furry"
					checked={false}
					onChange={onChange}
				/>
			)

			const checkbox = getByRole("checkbox")

			expect(checkbox).not.toBeChecked()

			await userEvent.click(checkbox)

			expect(checkbox).not.toBeChecked()
		})

		it("raises onChange events when clicked directly", async () => {
			const onChange = jest.fn()
			const { getByRole } = render(
				<Checkbox
					name="am-furry"
					label="I am a furry"
					checked={false}
					onChange={onChange}
				/>
			)

			const checkbox = getByRole("checkbox")

			await userEvent.click(checkbox)

			expect(onChange).toHaveBeenCalled()
		})

		it("raises onChange events when clicked indirectly", async () => {
			const onChange = jest.fn()
			const { getByText } = render(
				<Checkbox
					name="am-furry"
					label="I am a furry"
					checked={false}
					onChange={onChange}
				/>
			)

			const checkbox = getByText("I am a furry")

			await userEvent.click(checkbox)

			expect(onChange).toHaveBeenCalled()
		})
	})

	describe("when uncontrolled", () => {
		it("toggles when clicked directly", async () => {
			const { getByRole } = render(
				<Checkbox name="am-furry" label="I am a furry" />
			)

			const checkbox = getByRole("checkbox")

			expect(checkbox).not.toBeChecked()

			await userEvent.click(checkbox)

			expect(checkbox).toBeChecked()
		})

		it("toggles when clicked through label", async () => {
			const { getByRole, getByText } = render(
				<Checkbox name="am-furry" label="I am a furry" />
			)

			const label = getByText("I am a furry")
			const checkbox = getByRole("checkbox")

			expect(checkbox).not.toBeChecked()

			await userEvent.click(label)

			expect(checkbox).toBeChecked()
		})

		it("reflects the defaultChecked value (true) originally", () => {
			const { getByRole } = render(
				<Checkbox name="am-furry" label="I am a furry" defaultChecked={true} />
			)

			expect(getByRole("checkbox")).toBeChecked()
		})

		it("reflects the defaultChecked value (false) originally", () => {
			const { getByRole } = render(
				<Checkbox name="am-furry" label="I am a furry" defaultChecked={false} />
			)

			expect(getByRole("checkbox")).not.toBeChecked()
		})

		it("raises onChange events when toggled directly", async () => {
			const onChange = jest.fn()
			const { getByRole } = render(
				<Checkbox name="am-furry" label="I am a furry" onChange={onChange} />
			)

			const checkbox = getByRole("checkbox")

			await userEvent.click(checkbox)

			expect(onChange).toHaveBeenCalled()
		})

		it("raises onChange events when toggled indirectly", async () => {
			const onChange = jest.fn()
			const { getByText } = render(
				<Checkbox name="am-furry" label="I am a furry" onChange={onChange} />
			)

			const checkbox = getByText("I am a furry")

			await userEvent.click(checkbox)

			expect(onChange).toHaveBeenCalled()
		})
	})
})
