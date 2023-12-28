import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';


const ContactFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'First Name must be 3 character long!')
    .required('First Name is Required!'),
  lastName: Yup.string()
    .min(3, 'Last Name must be 3 character long!')
    .required('Last Name is Required!'),
    businessName: Yup.string()
    .min(3, 'Business Name must be 3 character long!')
    .required('Business Name is Required!'),
    phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone must be only digits")
    .min(10, 'Phone must be exactly 10 digits')
    .max(10, 'Phone must be exactly 10 digits').required('Phone is Required!'),
  email: Yup.string().email('Invalid email').required('Email is Required!'),
});

const ContactForm = ({ onEmailSent }) => (
  <div className="bg-white p-6 mx-auto rounded">
    <Toaster />
    <h2 className="text-xl font-semibold mb-4 text-black">Contact Us</h2>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        phone: '',
        subject: 'NEW ERC CLAIM',
        message: 'Hi, I am reaching out on behalf of my business to learn more about our ERC claim process.',
      }}
      validationSchema={ContactFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission logic here
        const { businessName, ...otherValues } = values;
        const subject = `NEW ERC Claim for ${businessName}`;
        // console.log({ ...otherValues, subject });
        const formDataToSend = new FormData();
        formDataToSend.append('formData', JSON.stringify({ ...otherValues, subject }));
        // console.log(formDataToSend);
        fetch('https://api.greenbackclaims.com/contact-us', {
          method: 'POST',
          body: formDataToSend,
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle response
            if(data.status == 200){
             console.log(200);
             onEmailSent();
            }
            if (data.status == 500){
              toast.error(data.message, {
                position: window.matchMedia("(min-width: 600px)").matches ? "top-right" : "top-center",
                style: {
                  backgroundColor: '#d9d9d9',
                  padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                  fontSize: '14px',
                  fontWeight: 'bold'
                },
              });
            }

          })
          .catch((error) => {
            // Handle error
            toast.error(error.message, {
              position: window.matchMedia("(min-width: 600px)").matches ? "top-right" : "top-center",
              style: {
                backgroundColor: '#d9d9d9',
                padding: window.matchMedia("(min-width: 600px)").matches ? "20px 30px" : "15px 20px",
                fontSize: '14px',
                fontWeight: 'bold'
              },
            });
          })
          .finally(() => {
          })
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
              <Field className="border p-2 mt-2 border-blue-400 rounded w-full text-black" id="firstName" name="firstName" placeholder="First Name" type="text" />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-[12px]" />
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-black" htmlFor="lastName">
                Last Name:
              </label>
              <Field className="border p-2 mt-2 border-blue-400 rounded w-full text-black" id="lastName" name="lastName" placeholder="Last Name" type="text" />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-[12px]" />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-medium text-black" htmlFor="businessName">
                Business Name:
              </label>
              <Field className="border p-2 mt-2 border-blue-400 rounded w-full text-black" id="businessName" name="businessName" placeholder="Business Name" type="text" />
              <ErrorMessage name="businessName" component="div" className="text-red-500 text-[12px]" />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-medium text-black" htmlFor="email">
                Email:
              </label>
              <Field className="border p-2 mt-2 border-blue-400 rounded w-full text-black" id="email" name="email" placeholder="Email" type="email" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-[12px]" />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-medium text-black" htmlFor="phone">
                Phone:
              </label>
              <Field className="border p-2 mt-2 border-blue-400 rounded w-full text-black" id="phone" name="phone" placeholder="Phone Number" type="tel" />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-[12px]" />
            </div>
            {/* <div className="hidden">
              <label className="font-medium text-black" htmlFor="subject">
                Subject:
              </label>
              <Field className="border p-2 mt-2 border-blue-400 rounded w-full text-black" id="subject" name="subject" type="text" />
              <ErrorMessage name="subject" component="div" className="text-red-500 text-[12px]" />
            </div> */}
            <div className="hidden">
              <label className="font-medium text-black" htmlFor="message">
                Message:
              </label>
              <Field className="border p-2 mt-2 border-blue-400 rounded h-32 w-full text-black" as="textarea" id="message" name="message" />
              <ErrorMessage name="message" component="div" className="text-red-500 text-[12px]" />
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white p-2 mt-2 border-blue-400 rounded" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  </div>
);
ContactForm.propTypes = {
  onEmailSent: PropTypes.func.isRequired,
};
export default ContactForm;
