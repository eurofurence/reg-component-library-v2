/** @jsxImportSource @emotion/react */

import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as fc from "fast-check"
import renderer from "react-test-renderer"

import { RadioGroup, RadioItem, RadioSet } from "./radio-button"

describe("RadioItem", () => {
	it("renders correctly", () => {
		fc.assert(
			fc.property(
				fc.option(fc.string(), { nil: undefined }),
				fc.boolean(),
				(label, checked) => {
					const tree = renderer
						.create(
							<RadioGroup name="popularity-contest">
								<RadioItem value="nick-wilde" label={label} checked={checked} />
							</RadioGroup>
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
			<RadioGroup name="popularity-contest">
				<RadioItem value="nick-wilde" label="Nick Wilde" />
			</RadioGroup>
		)

		expect(queryByLabelText("Nick Wilde")).toBeTruthy()
	})

	it("does not have a label if none is provided", () => {
		const { container } = render(
			<RadioGroup name="popularity-contest">
				<RadioItem value="nick-wilde" />
			</RadioGroup>
		)

		expect(container.querySelector("label")).toBeFalsy()
	})

	describe("when controlled", () => {
		it("reflects the input value at all times (true)", async () => {
			const onChange = jest.fn()
			const { getByRole } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem
						value="nick-wilde"
						label="Nick Wilde"
						checked={true}
						onChange={onChange}
					/>
				</RadioGroup>
			)

			const radio = getByRole("radio")

			expect(radio).toBeChecked()

			await userEvent.click(radio)

			expect(radio).toBeChecked()
		})

		it("reflects the input value at all times (false)", async () => {
			const onChange = jest.fn()
			const { getByRole } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem
						value="nick-wilde"
						label="Nick Wilde"
						checked={false}
						onChange={onChange}
					/>
				</RadioGroup>
			)

			const radio = getByRole("radio")

			expect(radio).not.toBeChecked()

			await userEvent.click(radio)

			expect(radio).not.toBeChecked()
		})

		it("raises onChange events when clicked directly", async () => {
			const onChange = jest.fn()
			const { getByRole } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem
						value="nick-wilde"
						label="Nick Wilde"
						checked={false}
						onChange={onChange}
					/>
				</RadioGroup>
			)

			const radio = getByRole("radio")

			await userEvent.click(radio)

			expect(onChange).toHaveBeenCalled()
		})

		it("raises onChange events when clicked indirectly", async () => {
			const onChange = jest.fn()
			const { getByText } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem
						value="nick-wilde"
						label="Nick Wilde"
						checked={false}
						onChange={onChange}
					/>
				</RadioGroup>
			)

			const radio = getByText("Nick Wilde")

			await userEvent.click(radio)

			expect(onChange).toHaveBeenCalled()
		})
	})

	describe("when uncontrolled", () => {
		it("toggles when clicked directly", async () => {
			const { getByRole } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem value="nick-wilde" label="Nick Wilde" />
				</RadioGroup>
			)

			const radio = getByRole("radio")

			expect(radio).not.toBeChecked()

			await userEvent.click(radio)

			expect(radio).toBeChecked()
		})

		it("toggles when clicked through label", async () => {
			const { getByRole, getByText } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem value="nick-wilde" label="Nick Wilde" />
				</RadioGroup>
			)

			const label = getByText("Nick Wilde")
			const radio = getByRole("radio")

			expect(radio).not.toBeChecked()

			await userEvent.click(label)

			expect(radio).toBeChecked()
		})

		it("reflects the defaultChecked value (true) originally", () => {
			const { getByRole } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem
						value="nick-wilde"
						label="Nick Wilde"
						defaultChecked={true}
					/>
				</RadioGroup>
			)

			expect(getByRole("radio")).toBeChecked()
		})

		it("reflects the defaultChecked value (false) originally", () => {
			const { getByRole } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem
						value="nick-wilde"
						label="Nick Wilde"
						defaultChecked={false}
					/>
				</RadioGroup>
			)

			expect(getByRole("radio")).not.toBeChecked()
		})

		it("raises onChange events when toggled directly", async () => {
			const onChange = jest.fn()
			const { getByRole } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem
						value="nick-wilde"
						label="Nick Wilde"
						onChange={onChange}
					/>
				</RadioGroup>
			)

			const radio = getByRole("radio")

			await userEvent.click(radio)

			expect(onChange).toHaveBeenCalled()
		})

		it("raises onChange events when toggled indirectly", async () => {
			const onChange = jest.fn()
			const { getByText } = render(
				<RadioGroup name="popularity-contest">
					<RadioItem
						value="nick-wilde"
						label="Nick Wilde"
						onChange={onChange}
					/>
				</RadioGroup>
			)

			const radio = getByText("Nick Wilde")

			await userEvent.click(radio)

			expect(onChange).toHaveBeenCalled()
		})
	})
})

describe("RadioGroup", () => {
	it("groups radio buttons together", async () => {
		const onChange = jest.fn()
		const { getByLabelText } = render(
			<RadioGroup name="popularity-contest">
				<RadioItem value="robin-hood" label="Robin Hood" onChange={onChange} />
				<RadioItem value="nick-wilde" label="Nick Wilde" onChange={onChange} />
				<RadioItem
					value="fox-mccloud"
					label="Fox McCloud"
					onChange={onChange}
				/>
			</RadioGroup>
		)

		const robinHood = getByLabelText("Robin Hood")
		const nickWilde = getByLabelText("Nick Wilde")

		await userEvent.click(robinHood)

		expect(robinHood).toBeChecked()

		await userEvent.click(nickWilde)

		expect(robinHood).not.toBeChecked()
	})
})

describe("RadioSet", () => {
	it("groups radio buttons together", async () => {
		const onChange = jest.fn()
		const { getByLabelText } = render(
			<RadioSet name="popularity-contest" legend="Who is best fox?">
				<RadioItem value="robin-hood" label="Robin Hood" onChange={onChange} />
				<RadioItem value="nick-wilde" label="Nick Wilde" onChange={onChange} />
				<RadioItem
					value="fox-mccloud"
					label="Fox McCloud"
					onChange={onChange}
				/>
			</RadioSet>
		)

		const robinHood = getByLabelText("Robin Hood")
		const nickWilde = getByLabelText("Nick Wilde")

		await userEvent.click(robinHood)

		expect(robinHood).toBeChecked()

		await userEvent.click(nickWilde)

		expect(robinHood).not.toBeChecked()
	})

	it("adds a legend", () => {
		const onChange = jest.fn()
		const { queryByText } = render(
			<RadioSet name="popularity-contest" legend="Who is best fox?">
				<RadioItem value="robin-hood" label="Robin Hood" onChange={onChange} />
				<RadioItem value="nick-wilde" label="Nick Wilde" onChange={onChange} />
				<RadioItem
					value="fox-mccloud"
					label="Fox McCloud"
					onChange={onChange}
				/>
			</RadioSet>
		)

		expect(queryByText("Who is best fox?")).toBeTruthy()
	})
})
