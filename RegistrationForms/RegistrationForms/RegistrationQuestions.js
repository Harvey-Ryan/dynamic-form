import * as Yup from 'yup';

const registrationQuestions = [
	{
		controlId: "accountType",
		question: "Select the type of account you wish to register.",
		label: "Account Type",
		type: "select",
		placeholder: "Select an option",
		options: ["Select an option", "General Contractor", "Sub-Contractor"],
		validation: Yup.string().oneOf(["General Contractor", "Sub-Contractor"], "Must select account type.").required('Account Type is required'),
	},
	{
		controlId: "firstName",
		question: "Welcome to Kizer! What is your name?",
		label: "First Name",
		type: "text",
		placeholder: "Enter your first name",
		validation: Yup.string().required('First Name is required').min(2, "First Name must be at least 2 characters"),
	},
	{
		controlId: "lastName",
        question: "What is your last name?",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        validation: Yup.string().required('Last Name is required').min(2, "Last Name must be at least 2 characters"),
	},
	{
		controlId: "title",
		question: "What is your job title?",
		label: "Title",
		type: "text",
		placeholder: "Enter your job title",
		validation: Yup.string().required('Title is required').min(2, "Title must be at least 2 characters"),
	},
	{
		controlId: "phoneNumber",
		question: "What is your phone number?",
		label: "Phone Number",
		type: "tel",
		placeholder: "Enter your phone number",
		validation:
			Yup.string().matches(/^[0-9]+$/, "Phone number must only contain numbers.").required('Phone number must only contain numbers.').min(10, "Phone number must consist of ONLY 10 digits including area code.")
	},
	{
		controlId: "emailAddress",
		question: "What is your email address?",
		label: "Email Address",
		type: "email",
		placeholder: "Enter your email address",
		validation: Yup.string().email().required('Invalid email address'),
	},
	// {
	// 	controlId: "password",
	// 	question:
	// 		"Let's keep things secure! Create a password for your account.",
	// 	label: "Password",
	// 	type: "password",
	// 	placeholder: "Enter a password",
	// 	validation:
	// 		Yup.string().min(8).required('Password must be at least 8 characters'),
	// },
	{
		controlId: "companyName",
		question: "What is the name of your Company?",
		label: "Company Name",
		type: "text",
		placeholder: "Enter your company name",
		validation: Yup.string().required('Company Name is required').min(2, "Company Name must be at least 2 characters"),
	},
	{
		controlId: "companyPhone",
		question: "What is the phone number for this company?",
		label: "Company Phone Number",
		type: "tel",
		placeholder: "Enter your company's phone number",
		validation:
			Yup.string().matches(/^[0-9]+$/).required('Phone number must only contain numbers').min(10, "Phone number must consist of ONLY 10 digits including area code."),
	},
	{
		controlId: "companyEmail",
		question:
			"What is the general contact email address for this company?",
		label: "Company Email Address",
		type: "email",
		placeholder: "Enter your company's email address",
		validation: Yup.string().email().required('Invalid email address'),
	},
	{
		controlId: "companyAddress",
		question: "Where is this company located?",
		label: "Company Address",
		type: "text",
		placeholder: "Enter your company's address",
		validation: Yup.string().required('Company Address is required'),
	},
];

export default registrationQuestions;
