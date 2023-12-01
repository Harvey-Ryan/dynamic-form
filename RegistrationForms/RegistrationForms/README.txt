JsonQuestionaire.jsx
Single input form designed to map through an Array of Objects.
Takes parameters for:
    controlId = String containing object key.
    question = String containing your question.
    label = String containing plain english Form label.
    type = String containing input type.
    placeholder = String containing placeholder.
    options = Array of strings containing desired options. (only required if utilizing Select input)
    validation: !! NOT A STRING !! Yup validation written as if it's directly in the schema.

Questions imported from ../RegistrationQuestions.js

Limitations:
- Currently only handles one single input at a time.
- Responses not saved on refresh.
- No API call until ALL responses are batched at the end of the Questions Array.

Example JSON:
	{
		controlId: "accountType",
		question: "Select the type of account you wish to register.",
		label: "Account Type",
		type: "select",
		placeholder: "Select an option",
		options: ["Select an option", "General Contractor", "Sub-Contractor"],
		validation: Yup.string().oneOf(["General Contractor", "Sub-Contractor"], "Must select account type.").required('Account Type is required'),
	},


Documentation:
- Yup Validation
    - https://www.npmjs.com/package/yup

    Chain your validations and pass in argument + Error Message.
    - Example:
      { validation: Yup.string().required('Last Name is required').min(2, "Last Name must be at least 2 characters"), }
