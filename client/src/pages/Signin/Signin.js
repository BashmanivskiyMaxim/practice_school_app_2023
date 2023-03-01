import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { SIGNIN } from "../../Mutations/Mutations";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  // eslint-disable-next-line no-unused-vars
  const [signin, { data: dataSignIn, loading }] = useMutation(SIGNIN);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [variables, setVariables] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const onSubmit = (data) => {
    setVariables({
      email: data.email,
      password: data.password,
    });
    console.log(data)
    signin({
      variables,
    });


  };

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    if (dataSignIn) {
      if (dataSignIn.signin.userErrors.length) {
        setError(dataSignIn.signin.userErrors[0].message);
      }
      if (dataSignIn.signin.token) {
        localStorage.setItem("token", dataSignIn.signin.token);
        localStorage.setItem("UserId", dataSignIn.signin.userId)
        history("/profile/" +  dataSignIn.signin.userId)
      }
    }
  }, [dataSignIn]);

  return (
    <div class="signup">
      <h1>Авторизація</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder={"E-mail*"}
          {...register("email", {
            required: "Обов'язкове поле!",
            pattern: {
              value:
                // eslint-disable-next-line no-control-regex
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
              message: "Помилка валідації",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p className="p-form" role="alert">{errors.email?.message}</p>}
        <input
          placeholder={"Пароль"}
          {...register("password", {
            required: "Обов'язкове поле!",
            minLength: {
              value: 5,
              message: "Пароль має містити мінімум 5 символів!",
            },
          })}
        />
        {errors.password && <p className="p-form" role="alert">{errors.password?.message}</p>}
        <Button variant="primary" type="submit">
          Увійти
        </Button>
      </form>
      <NavLink style={{"marginLeft": "350px"}} to={"/signup"}>Реєстрація</NavLink>
    </div>
  );
}
