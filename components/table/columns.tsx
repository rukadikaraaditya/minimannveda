"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModel from "../AppointmentModel";
import { Appointment } from "@/types/appwrite.types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };



export const columns: ColumnDef<Appointment>[] = [
  {
    header:"ID",
    cell:({row})=><p className="text-14-medium">{row.index+1}</p>
  },
  {
    accessorKey: "patient",
    header:"Patient",
  //   cell:({row})=> {
  //       return <p className="text-14-medium">{row.original.patient.name}</p>
  //   }
  // },
   cell: ({ row }) => {
      const patient = row.original.patient;
      return (
        <p className="text-14-medium">
          {patient ? patient.name : "Unknown Patient"}
        </p>
      );
    },
  {
    accessorKey: "status",
    header: "Status",
    cell:({row})=>(
        <div className="min-w-[115px]">
            <StatusBadge status={row.original.status}/>
        </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryConsultant",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryConsultant
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header:()=><div className="pl-4">Actions</div>,
    cell: ({ row:{original:data} }) => {
      return (
        <div className="flex gap-1">
        <AppointmentModel
            type="schedule"
            patientId={data.patient?.$id || ""}
            userId={data.userId}
            appointment={data}
            title="Schedule Appointment"
            description="Are you sure you want to schedule this appointment?"
        />
        <AppointmentModel
            type="cancel"
            patientId={data.patient?.$id || ""}
            userId={data.userId}
            appointment={data}
            title="Cancel Appointment"
            description="Are you sure you want to cancel this appointment?"
        />
        </div>
      );
    },
  },
];
