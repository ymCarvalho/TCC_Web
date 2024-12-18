import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

function App() {
  const handleClickRegister = (values) => console.log(values);
  const validadionRegister = yup.object().shape({
    email: yup.string().email().required("Email obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter 8 caracteres")
      .required("Senha obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
  });
  const handleClickLogin = (values) => console.log(values);
  const validadioLogin = yup.object().shape({
    email: yup.string().email().required("Email obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter 8 caracteres")
      .required("Senha obrigatória"),
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleClickLogin}
        validationSchema={validadioLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="field" placeHolder="Email" />
            <ErrorMessage component="span" name="email" className="error" />
          </div>
          <div className="password-form-group">
            <Field name="password" className="field" placeHolder="Senha" />
            <ErrorMessage component="span" name="password" className="error" />
          </div>
          <button className="button" type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <h1>Cadastro</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleClickRegister}
        validationSchema={validadionRegister}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="field" placeHolder="Email" />
            <ErrorMessage component="span" name="email" className="error" />
          </div>
          <div className="password-form-group">
            <Field name="password" className="field" placeHolder="Senha" />
            <ErrorMessage component="span" name="password" className="error" />
          </div>
          <div className="password-form-group">
            <Field
              name="confirmPassword"
              className="field"
              placeHolder="Confirmar senha"
            />
            <ErrorMessage
              component="span"
              name="confirmPassword"
              className="error"
            />
          </div>
          <button className="button" type="submit">
            Cadastro
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
