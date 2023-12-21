import { Formik, Form, Field, ErrorMessage } from 'formik';

const ContactForm = () => (
  <div className="bg-white p-6 mx-auto rounded">
    <h2 className="text-xl font-semibold mb-4 text-black">Contact Us</h2>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        phone: '',
        subject: 'ERC CLAIM',
        message: 'Hi, I am reaching out on behalf of my business to learn more about our ERC claim process.',
      }}
      validate={values => {
        const errors = {};
        // Your validation logic here if needed
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission logic here
        const { businessName, ...otherValues } = values;
        const subject = `ERC Claim for ${businessName}`;
        console.log({ ...otherValues, subject });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
        <p className="text-sm mb-4 text-gray-600">Please submit business information for our lawyers to analyze we will reach out shortly.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-black" htmlFor="firstName">
                First Name:
              </label>
              <Field className="border p-2 rounded w-full text-black" id="firstName" name="firstName" placeholder="First Name" type="text" />
              <ErrorMessage name="firstName" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-black" htmlFor="lastName">
                Last Name:
              </label>
              <Field className="border p-2 rounded w-full text-black" id="lastName" name="lastName" placeholder="Last Name" type="text" />
              <ErrorMessage name="lastName" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-medium text-black" htmlFor="businessName">
                Business Name:
              </label>
              <Field className="border p-2 rounded w-full text-black" id="businessName" name="businessName" placeholder="Business Name" type="text" />
              <ErrorMessage name="businessName" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-medium text-black" htmlFor="email">
                Email:
              </label>
              <Field className="border p-2 rounded w-full text-black" id="email" name="email" placeholder="Email" type="email" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-medium text-black" htmlFor="phone">
                Phone:
              </label>
              <Field className="border p-2 rounded w-full text-black" id="phone" name="phone" placeholder="Phone Number" type="tel" />
              <ErrorMessage name="phone" component="div" className="text-red-500" />
            </div>
            <div className="hidden">
              <label className="font-medium text-black" htmlFor="subject">
                Subject:
              </label>
              <Field className="border p-2 rounded w-full text-black" id="subject" name="subject" type="text" />
              <ErrorMessage name="subject" component="div" className="text-red-500" />
            </div>
            <div className="hidden">
              <label className="font-medium text-black" htmlFor="message">
                Message:
              </label>
              <Field className="border p-2 rounded h-32 w-full text-black" as="textarea" id="message" name="message" />
              <ErrorMessage name="message" component="div" className="text-red-500" />
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ContactForm;