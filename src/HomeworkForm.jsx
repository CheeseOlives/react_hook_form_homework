import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  dob: yup.date().required(),
  phone: yup
    .number()
    .integer()
    .positive()
    // .minLength(2, "must be at least 2 numbers long")
    // .maxLength(11, "must be a maximum of 11 numbers long")
    .required(),
});

const defaultValues = {
  name: "",
  email: "",
  dob: "",
  phone: "",
};

export default function MyForm() {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const { isDirty, isValid, isSubmitting, errors } = formState;

  const submitFn = (values) => {
    console.log(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" {...register("name")} />
        {errors.name && (
          <label htmlFor="name" role="alert" className="error">
            {errors.name?.message}
          </label>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" {...register("email")} />
        {errors.email && (
          <label htmlFor="email" role="alert" className="error">
            {errors.email?.message}
          </label>
        )}
      </div>

      <div>
        <label htmlFor="dob">DoB</label>
        <input type="date" name="dob" id="dob" {...register("dob")} />
        {errors.dob && (
          <label htmlFor="dob" role="alert" className="error">
            {errors.dob?.message}
          </label>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input type="number" name="phone" id="phone" {...register("phone")} />
        {errors.phone && (
          <label htmlFor="phone" role="alert" className="error">
            {errors.phone?.message}
          </label>
        )}
      </div>

      <div>
        <button type="reset" onClick={() => reset()}>
          Reset
        </button>
        <button type="submit" disabled={isSubmitting || !isValid || !isDirty}>
          Submit
        </button>
      </div>
    </form>
  );
}
