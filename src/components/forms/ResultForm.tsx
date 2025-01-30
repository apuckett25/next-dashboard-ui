"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputField from "../InputField"

const schema = z.object({
  subject: z.string().min(1, {message: "Subject Name is required!"}),
  class: z.string().min(1, {message: "Class is required!"}),
  teacher: z.string().min(1, {message: "Teacher is required!"}),
  student: z.string().min(1, {message: "Student is required!"}),
  date: z.date({message: "Date is required!"}),
  type: z.string().min(3, {message: "Type is required!"}),
  score: z.number().min(3, {message: "Please enter the score!"}),
});

type Inputs = z.infer<typeof schema>;

const ResultForm = ({
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
      <h1 className="text-xl text-semibold">Edit the Assignments</h1>
      
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
        label="Student"
        name="student"
        defaultValue={data?.student}
        register={register}
        error={errors?.student}
        />
        <InputField
        label="Date"
        name="date"
        defaultValue={data?.date}
        register={register}
        error={errors?.date}
        type="Date"
        />
        <InputField
        label="Type"
        name="type"
        defaultValue={data?.type}
        register={register}
        error={errors?.type}
        />
        <InputField
        label="Score"
        name="score"
        defaultValue={data?.score}
        register={register}
        error={errors?.score}
        type="Number"
        />
      </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create" ? "Create" : "Update"}</button>
    </form>
  )
}

export default ResultForm;