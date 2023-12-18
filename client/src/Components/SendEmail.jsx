import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function SendEmail() {
    return (
        <div>
    <h1>Contact Form</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        phone: '',
        subject: '',
      }}
      validate={values => {
        const errors = {};
        // You can add validation logic here if needed
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission here
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="firstName">First Name:</label>
          <Field type="text" id="firstName" name="firstName" required />
          <ErrorMessage name="firstName" component="div" />

          <label htmlFor="lastName">Last Name:</label>
          <Field type="text" id="lastName" name="lastName" required />
          <ErrorMessage name="lastName" component="div" />

          <label htmlFor="businessName">Business Name:</label>
          <Field type="text" id="businessName" name="businessName" required />
          <ErrorMessage name="businessName" component="div" />

          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" required />
          <ErrorMessage name="email" component="div" />

          <label htmlFor="phone">Phone:</label>
          <Field type="tel" id="phone" name="phone" required />
          <ErrorMessage name="phone" component="div" />

          <label htmlFor="subject">Subject:</label>
          <Field type="text" id="subject" name="subject" required />
          <ErrorMessage name="subject" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>

)
}
