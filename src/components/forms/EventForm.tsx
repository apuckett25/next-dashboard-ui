"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputField from "../InputField"

const schema = z.object({
  title: z.string().min(1, {message: "Title is required!"}),
  class: z.string().min(1, {message: "Class is required!"}),
  date: z.date({message: "Date is required!"}),
  startTime: z.string().min(3, {message: "Start Time is required!"}),
  endTime: z.string().min(3, {message: "End Time the score!"}),
});

type Inputs = z.infer<typeof schema>;

const EventForm = ({
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
      <h1 className="text-xl text-semibold">Edit the event</h1>
      
      {/* AUTHENTICATION */}
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
        label="Title"
        name="title"
        defaultValue={data?.title}
        register={register}
        error={errors?.title}
        />
        <InputField
        label="Class"
        name="class"
        defaultValue={data?.class}
        register={register}
        error={errors?.class}
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
        label="Start Time"
        name="startTime"
        defaultValue={data?.startTime}
        register={register}
        error={errors?.startTime}
        />
        <InputField
        label="End Time"
        name="endTime"
        defaultValue={data?.endTime}
        register={register}
        error={errors?.endTime}
        />
      </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create" ? "Create" : "Update"}</button>
    </form>
  )
}

export default EventForm;