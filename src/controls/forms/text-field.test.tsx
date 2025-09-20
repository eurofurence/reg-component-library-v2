/** @jsxImportSource @emotion/react */

import { ChangeEventHandler } from "react"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as fc from "fast-check"

import TextField from "./text-field"

describe("TextField", () => {
	it("renders correctly", () => {
		fc.assert(
			fc.property(fc.string(), fc.string(), (label, placeholder) => {
				const { container } = render(
					<TextField name="username" label={label} placeholder={placeholder} />
				)

				expect(container.firstChild).toMatchSnapshot()
			}),
			{ numRuns: 20, seed: 2562346 }
		)
	})

	it("has a label", () => {
		const { queryByLabelText } = render(
			<TextField name="username" label="Username" placeholder="" />
		)

		expect(queryByLabelText("Username")).toBeTruthy()
	})

	it("enters focus when clicked directly", async () => {
		const { getByRole } = render(
			<TextField name="username" label="Username" placeholder="" />
		)

		const textField = getByRole("textbox")

		expect(textField).not.toHaveFocus()

		await userEvent.click(textField)

		expect(textField).toHaveFocus()
	})

	it("enters focus when clicked through label", async () => {
		const { getByRole, getByText } = render(
			<TextField name="username" label="Username" placeholder="" />
		)

		const label = getByText("Username")
		const textField = getByRole("textbox")

		expect(textField).not.toHaveFocus()

		await userEvent.click(label)

		expect(textField).toHaveFocus()
	})

	it.skip("can handle unicode input", async () => {
		await fc.assert(
			fc.asyncProperty(
				fc
					.string({ minLength: 1 })
					.filter(
						(s) =>
							s.trim().length > 0 &&
							!/[!"\\#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/u.test(s) &&
							!s.includes("__proto__") &&
							!s.includes("arguments")
					),
				async (input) => {
					const onChange = jest.fn() as jest.MockedFunction<
						ChangeEventHandler<HTMLInputElement>
					>
					const { getByRole } = render(
						<TextField
							name="username"
							label="Username"
							placeholder=""
							onChange={onChange}
						/>
					)

					const textField = getByRole("textbox")

					await userEvent.type(textField, input)

					expect(
						onChange.mock.calls[onChange.mock.calls.length - 1][0].target.value
					).toEqual(input)
				}
			)
		)
	}, 30000)

	it.skip("can display unicode", async () => {
		await fc.assert(
			fc.asyncProperty(
				fc
					.string({ minLength: 1 })
					.filter(
						(s) =>
							s.trim().length > 0 &&
							!/[!"\\#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/u.test(s) &&
							!s.includes("__proto__") &&
							!s.includes("arguments")
					),
				async (input) => {
					const onChange = jest.fn() as jest.MockedFunction<
						ChangeEventHandler<HTMLInputElement>
					>
					const { getByRole } = render(
						<TextField
							name="username"
							label="Username"
							placeholder=""
							value={input}
							onChange={onChange}
						/>
					)

					const textField = getByRole("textbox")

					await userEvent.type(textField, input)

					expect(textField).toHaveValue(input)
				}
			)
		)
	}, 30000)

	describe("when controlled", () => {
		it("reflects the input value at all times", async () => {
			const onChange = jest.fn() as jest.MockedFunction<
				ChangeEventHandler<HTMLInputElement>
			>
			const { getByRole } = render(
				<TextField
					name="username"
					label="Username"
					value="test"
					placeholder=""
					onChange={onChange}
				/>
			)

			const textField = getByRole("textbox")

			expect(textField).toHaveValue("test")

			await userEvent.type(textField, "john-doe")

			expect(textField).toHaveValue("test")
		})

		it("raises onChange events when typed in", async () => {
			const onChange = jest.fn() as jest.MockedFunction<
				ChangeEventHandler<HTMLInputElement>
			>
			const { getByRole } = render(
				<TextField
					name="username"
					label="Username"
					value="test"
					placeholder=""
					onChange={onChange}
				/>
			)

			const textField = getByRole("textbox")

			await userEvent.type(textField, "john-doe")

			expect(onChange).toHaveBeenCalled()
		})

		it("supports readOnly fields", async () => {
			const { getByRole } = render(
				<TextField
					name="username"
					label="Username"
					value="test"
					placeholder=""
					readOnly
				/>
			)

			const textField = getByRole("textbox")

			await userEvent.type(textField, "john-doe")

			expect(textField).toHaveValue("test")
		})
	})

	describe("when uncontrolled", () => {
		it("reflects the typed value", async () => {
			const { getByRole } = render(
				<TextField name="username" label="Username" placeholder="" />
			)

			const textField = getByRole("textbox")

			await userEvent.type(textField, "john-doe")

			expect(textField).toHaveValue("john-doe")
		})

		it("reflects the defaultValue value originally", () => {
			const { getByRole } = render(
				<TextField
					name="username"
					label="Username"
					placeholder=""
					defaultValue="uwu"
				/>
			)

			expect(getByRole("textbox")).toHaveValue("uwu")
		})

		it("raises onChange events when typed in", async () => {
			const onChange = jest.fn() as jest.MockedFunction<
				ChangeEventHandler<HTMLInputElement>
			>
			const { getByRole } = render(
				<TextField
					name="username"
					label="Username"
					placeholder=""
					onChange={onChange}
				/>
			)

			const textField = getByRole("textbox")

			await userEvent.type(textField, "john-doe")

			expect(onChange).toHaveBeenCalled()
		})
	})
})
