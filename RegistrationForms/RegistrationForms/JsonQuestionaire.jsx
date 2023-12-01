import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import registrationQuestions from "./RegistrationQuestions";


const JsonQuestionaire = () => {
    // Tracks which step (question) in the form. Controls the array mapping.
    const [step, setStep] = useState(1);
    // formData stores aggregated responses from ALL questions.
    const [formData, setFormData] = useState({});
    // Exists solely to force "touch" fields for validation when hitting the prev. question button.
    const [touchedFields, setTouchedFields] = useState({});
    // inputRef used to "focus" next question input on render.
    const inputRef = useRef(null);
    // Sets the expected shape of the question when pulled from the JSON.
    const currentQuestion = registrationQuestions[step - 1] || {
        controlId: "",
        type: "",
        placeholder: "",
        label: "",
        options: [],
    };

    // !Next button error logging.
    const nextClickHandler = () => {
        setTouchedFields({
            ...touchedFields,
            [currentQuestion.controlId]: true,
        });
        console.log("Next Button Clicked!");
        console.log(`Form ${step} Data: `, formData);
        console.log("Next Step: ", step + 1);
        console.log("Next Question: ", registrationQuestions[step]);
        console.log("ERRORS: ", formik.errors);
    };

    const goToPreviousQuestion = () => {
        const reviewedQuestion = registrationQuestions[step - 1];
        formik.setFieldTouched(reviewedQuestion.controlId, true);
        setStep(step - 1);
    };

    // Grab individual validations from JSON
    const currentQuestionValidationSchema = Yup.object().shape({
        [currentQuestion.controlId]: currentQuestion.validation,
    });

    // Formik handles all form state and validation.
    // Rules are set within the hook as follows.
    const formik = useFormik({
        initialValues: formData,
        validationSchema: currentQuestionValidationSchema,
        onSubmit: async (values) => {
            const errors = await formik.validateForm(values);
            if (Object.keys(errors).length > 0) {
                console.log("Validation Errors: ", errors);
                return;
            }
            console.log("Form Values:", values);
            // Update formData with the new values
            setFormData({ ...formData, ...values });
            setStep(step + 1);
        },
        onChange: async (values) => {
            const errors = await formik.validateForm(values);
            if (Object.keys(errors).length > 0) {
                console.log("Validation Errors: ", errors);
                return;
            }
            setFormData({ ...formData, ...values });
            console.log("Form Values:", values);
        },
        handleBlur: async (values) => {
            const errors = await formik.validateForm(values);
            if (Object.keys(errors).length > 0) {
                console.log("Validation Errors: ", errors);
                return;
            }
            setFormData(values);
            console.log("Form Values:", values);
        },
    });

    useEffect(() => {
        // Sets the input to "touched" when moving to the prev. question.
        if (
            step > 1 &&
            !formik.values[currentQuestion.controlId] === undefined
        ) {
            formik.setFieldTouched(currentQuestion.controlId, true);
        }
        // Focuses the input on render.
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [step]);

    return (
        <>
        {/* Checks that final question in the array from the JSON has been answered and renders submit button. */}
            {step === registrationQuestions.length + 1 ? (
                <div className="border rounded pt-5 pb-5 mt-5 bg-secondary shadow">
                    <h3 className="d-flex justify-content-around">
                        Registration Complete!
                    </h3>
                    <Button
                        onClick={() => {
                            // formik.handleSubmit();
                            console.log("All aggregated responses: ", formData);
                        }}
                        className="d-flex justify-content-around m-auto flex-column shadow mt-5"
                    >
                        Submit
                    </Button>
                </div>
            ) : (
                // Maps through the JSON and renders the questions and assoc. keys.
                <div className="border rounded pt-5 pb-5 mt-5 bg-secondary shadow">
                    <h3 className="d-flex justify-content-around">
                        {currentQuestion.question}
                    </h3>
                    <Form
                        onSubmit={formik.handleSubmit}
                        noValidate
                        className="d-flex justify-content-around m-auto flex-column w-50"
                    >
                        <Form.Group
                            controlId={currentQuestion.controlId}
                            className="d-flex"
                        >
                            <Col>
                                <Form.Control
                                    ref={inputRef}
                                    className="m-2"
                                    key={step}
                                    as={
                                        currentQuestion.type === "select"
                                            ? "select"
                                            : "input"
                                    }
                                    type={currentQuestion.type}
                                    placeholder={currentQuestion.placeholder}
                                    label={currentQuestion.label}
                                    value={
                                        formik.values[currentQuestion.controlId]
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isValid={
                                        formik.touched[
                                            currentQuestion.controlId
                                        ] &&
                                        !formik.errors[
                                            currentQuestion.controlId
                                        ]
                                    }
                                    isInvalid={
                                        formik.touched[
                                            currentQuestion.controlId
                                        ] &&
                                        formik.errors[currentQuestion.controlId]
                                    }
                                >
                                    {/* Checks to see if question requires a Select input w/ options rather than simple text. */}
                                    {currentQuestion.options &&
                                        currentQuestion.options.map(
                                            (option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            )
                                        )}
                                </Form.Control>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="m-2"
                                >
                                    {formik.errors[currentQuestion.controlId]}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Row className="d-flex justify-content-around">
                            <Col className="d-flex justify-content-start m-2">
                                <Button
                                    type="button"
                                    onClick={goToPreviousQuestion}
                                    disabled={step === 1}
                                    className="shadow"
                                >
                                    Prev. Question
                                </Button>
                            </Col>
                            <Col className="d-flex justify-content-end m-2">
                                <Button
                                    type="submit"
                                    // disabled={!formik.isValid}
                                    onClick={nextClickHandler}
                                    className="shadow"
                                >
                                    Next Question
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            )}
        </>
    );
};
export default JsonQuestionaire;
