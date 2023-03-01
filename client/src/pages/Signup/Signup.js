import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles.css";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { SIGNUP } from "../../Mutations/Mutations";

export default function Signup() {
  // eslint-disable-next-line no-unused-vars
  const [signup, { data, loading }] = useMutation(SIGNUP);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [variables, setVariables] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
  });

  const onSubmit = (data) => {
    setVariables({
      name: data.name,
      email: data.email,
      bio: data.bio,
      password: data.password,
    });
    signup({
      variables,
    });
  };

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.signup.userErrors.length) {
        setError(data.signup.userErrors[0].message);
      }
      if (data.signup.token) {
        localStorage.setItem("token", data.signup.token);
      }
    }
  }, [data]);
  return (
    <div class="signup">
      <h1>Реєстрація</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={"Ім'я"} {...register("name")} />

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
        <textarea
          style={{ fontSize: "14px" }}
          rows={"4"}
          cols={"78"}
          placeholder={"Про себе..."}
          {...register("bio", {})}
        />
        <Button variant="primary" type="submit">
              Реєстрація
            </Button>
      </form>
      <NavLink style={{"marginLeft": "350px"}} to={"/signin"}>Увійти</NavLink>
    </div>
  );
}
