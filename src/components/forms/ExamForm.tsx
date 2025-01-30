"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputField from "../InputField"

const schema = z.object({
  subject: z.string().min(1, {message: "Class Name is required!"}),
  class: z.string().min(1, {message: "Capacity is required!"}),
  teacher: z.string().min(1, {message: "Supervisor is required!"}),
  date: z.date({message: "Supervisor is required!"}),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({
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
      <h1 className="text-xl text-semibold">Edit the exam</h1>
      
      {/* AUTHENTICATION */}
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
        label="Subject Name"
        name="subject"
        defaultValue={data?.subject}
        register={register}
        error={errors?.subject}
        />
        <InputField
        label="Class"
        name="class"
        defaultValue={data?.class}
        register={register}
        error={errors?.class}
        />
        <InputField
        label="Teacher"
        name="teacher"
        defaultValue={data?.teacher}
        register={register}
        error={errors?.teacher}
        />
        <InputField
        label="Date"
        name="date"
        defaultValue={data?.date}
        register={register}
        error={errors?.date}
        type="Date"
        />
      </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create" ? "Create" : "Update"}</button>
    </form>
  )
}

export default ExamForm;