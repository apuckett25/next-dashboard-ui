"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputField from "../InputField"

const schema = z.object({
  name: z.string().min(1, {message: "Class Name is required!"}),
  capacity: z.number().min(1, {message: "Capacity is required!"}),
  grade: z.number().min(1, {message: "Grade is required!"}),
  supervisor: z.string().min(1, {message: "Supervisor is required!"}),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({
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
      <h1 className="text-xl text-semibold">Edit the class</h1>
      
      {/* AUTHENTICATION */}
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
        label="Class Name"
        name="name"
        defaultValue={data?.name}
        register={register}
        error={errors?.name}
        />
        <InputField
        label="Capacity"
        name="capacity"
        defaultValue={data?.capacity}
        register={register}
        error={errors?.capacity}
        type="number"
        />
        <InputField
        label="Grade"
        name="grade"
        defaultValue={data?.grade}
        register={register}
        error={errors?.grade}
        type="number"
        />
        <InputField
        label="Supervisor"
        name="supervisor"
        defaultValue={data?.supervisor}
        register={register}
        error={errors?.supervisor}
        />
      </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create" ? "Create" : "Update"}</button>
    </form>
  )
}

export default ClassForm;