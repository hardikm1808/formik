import "./App.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      birthdate: "",
      mobile_number: "",
      text_area: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      last_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),

      birthdate: Yup.date()
        .required()
        .test("age", "You must be 18 or older", function (birthdate) {
          const cutoff = new Date();
          cutoff.setFullYear(cutoff.getFullYear() - 18);
          return birthdate <= cutoff;
        }),
      mobile_number: Yup.string()
        .min(10, "Mininum 10 characters")
        .max(10, "Maximum 10 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className="App">
        <h1>Validation with Formik + Yup</h1>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
            />
            {formik.errors.first_name && formik.touched.first_name && (
              <p>{formik.errors.first_name}</p>
            )}
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
            />
            {formik.errors.last_name && formik.touched.last_name && (
              <p>{formik.errors.last_name}</p>
            )}
          </div>
          <div>
            Birthdate:
            <input
              type="date"
              name="birthdate"
              label="Birthdate"
              // onBlur={handleBlur}
              onChange={formik.handleChange}
            />
            {formik.errors.birthdate && formik.touched.birthdate && (
              <p>{formik.errors.birthdate}</p>
            )}
            <br />
          </div>
          <div>
            <label>Mobile Number:</label>
            <input
              type="number"
              name="mobile_number"
              value={formik.values.mobile_number}
              onChange={formik.handleChange}
            />
            {formik.errors.mobile_number && formik.touched.mobile_number && (
              <p>{formik.errors.mobile_number}</p>
            )}
          </div>
          <div>
            <label>Text Area:</label>
            <textarea
              name="text-area"
              id="textarea"
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
            />

            {/* {formik.errors.text_area && formik.touched.text_area && (
              <p>{formik.errors.text_area}</p>
            )} */}
            {/* <textarea
              type="text"
              name="text-area"
              value={formik.values.text_area}
              onChange={formik.handleChange}
            /> */}
            {/* {formik.errors.text_area && formik.touched.text_area && (
              <p>{formik.errors.text_area}</p>
            )} */}
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
