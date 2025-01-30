"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputField from "../InputField"
import Image from "next/image"

const schema = z.object({
  title: z.string().min(1, {message: "Subject is required!"}),
  class: z.string().min(3, {message: "Please enter in a class!"}),
  date: z.date({message: "Date is required!"}),
});

type Inputs = z.infer<typeof schema>;

const AnnouncementForm = ({
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
      <h1 className="text-xl text-semibold">Edit an announcement</h1>
      
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
      </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create" ? "Create" : "Update"}</button>
        {/* END OF PERSONAL INFORMATION */}
    </form>
  )
}

export default AnnouncementForm