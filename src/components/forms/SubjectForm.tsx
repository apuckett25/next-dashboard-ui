"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputField from "../InputField"

const schema = z.object({
  name: z.string().min(1, {message: "Subject is required!"}),
  teacher: z.string().min(3, {message: "Teacher is required!"}),
});

type Inputs = z.infer<typeof schema>;

const SubjectForm = ({
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
      <h1 className="text-xl text-semibold">Edit the subject</h1>
      
      {/* AUTHENTICATION */}
      <div className="flex flex-wrap justify-between gap-4">
        <InputField
        label="Subject"
        name="name"
        defaultValue={data?.name}
        register={register}
        error={errors?.name}
        />
        <InputField
        label="Teacher Name"
        name="teacher"
        defaultValue={data?.teacher}
        register={register}
        error={errors?.teacher}
        />
      </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create" ? "Create" : "Update"}</button>
    </form>
  )
}

export default SubjectForm;