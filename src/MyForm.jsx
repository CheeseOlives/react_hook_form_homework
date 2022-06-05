//lesson from 25/05/2022

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

const defaultValues = {
  name: "",
  email: "",
};

export default function MyForm() {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const { isDirty, isValid, isSubmitting, errors } = formState; //'isDirty': has the form been touched? 'isValid': is the form valid? 'isSubmitting': is the form currently submitting? 'errors': list of any errors.

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
//'...register' is will return props and those props will be put on the element.
