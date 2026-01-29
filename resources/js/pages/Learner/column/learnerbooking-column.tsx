import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export interface BookingColumn {
  book_id: string
  booking_date: string
  start_time: string
  end_time: string
  session_duration: number | string
  booking_status: string
  tutor_status: string
  tutor?: {
    user?: {
      name: string
    }
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "paid":
      return "bg-green-100 text-green-800"
    case "canceled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTutorStatusColor = (status: string) => {
  switch (status) {
    case "accept":
      return "bg-green-100 text-green-800"
    case "decline":
      return "bg-red-100 text-red-800"
    case "success":
      return "bg-blue-100 text-blue-800"
    case "failed":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const learnerBookingColumns: ColumnDef<BookingColumn>[] = [
  {
    accessorKey: "book_id",
    header: "Booking ID",
    cell: ({ row }) => (
      <span className="font-semibold">{row.getValue("book_id")}</span>
    ),
  },
  {
    accessorKey: "tutor.user.name",
    header: "Tutor",
    cell: ({ row }) => {
      const tutor = row.original.tutor
      return <span>{tutor?.user?.name || "N/A"}</span>
    },
  },
  {
    accessorKey: "booking_date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("booking_date") as string
      return <span>{date ? format(new Date(date), "MMM dd, yyyy") : "N/A"}</span>
    },
  },
  {
    accessorKey: "start_time",
    header: "Time",
    cell: ({ row }) => {
      const startTime = row.original.start_time
      const endTime = row.original.end_time
      return (
        <span>
          {startTime && endTime ? `${startTime} - ${endTime}` : "N/A"}
        </span>
      )
    },
  },
  {
    accessorKey: "session_duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration = row.getValue("session_duration")
      return <span>{duration ? `${duration} hr${duration !== 1 ? "s" : ""}` : "N/A"}</span>
    },
  },
  {
    accessorKey: "booking_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("booking_status") as string
      return (
        <Badge variant="outline" className={getStatusColor(status)}>
          {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "tutor_status",
    header: "Tutor Response",
    cell: ({ row }) => {
      const tutorStatus = row.getValue("tutor_status") as string
      return (
        <Badge variant="outline" className={getTutorStatusColor(tutorStatus)}>
          {tutorStatus?.charAt(0).toUpperCase() + tutorStatus?.slice(1)}
        </Badge>
      )
    },
  },
]
