"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputField from "../InputField"

const schema = z.object({
  name: z.string().min(1, {message: "Parent Name is required!"}),
  students: z.string().min(3, {message: "Please enter in the student(s)!"}),
  phone: z.string().min(3, {message: "Phone is required!"}),
  address: z.string().min(3, {message: "Address is required!"}),
});

type Inputs = z.infer<typeof schema>;

const ParentForm = ({
  type,
  data,
}:{
  type: "create" | "update";
  data?:any;
}) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = handleSubmit(data=>{
    console.log(data);
  });
  
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      {/* TITLE */}
      <h1 className="text-xl text-semibold">Edit the parent</h1>
      
      {/* AUTHENTICATION */}
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
        label="Parent Name"
        name="name"
        defaultValue={data?.name}
        register={register}
        error={errors?.name}
        />
        <InputField
        label="Student Name(s)"
        name="students"
        defaultValue={data?.students}
        register={register}
        error={errors?.students}
        />
        <InputField
        label="Phone"
        name="phone"
        defaultValue={data?.phone}
        register={register}
        error={errors?.phone}
        />
        <InputField
        label="Address"
        name="address"
        defaultValue={data?.address}
        register={register}
        error={errors?.address}
        />
      </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create" ? "Create" : "Update"}</button>
    </form>
  )
}

export default ParentForm;