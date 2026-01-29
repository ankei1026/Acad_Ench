import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  disabled?: boolean
}

function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
  disabled = false,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [hours, setHours] = React.useState(value ? value.split(":")[0] : "")
  const [minutes, setMinutes] = React.useState(value ? value.split(":")[1] : "")

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === "" || (parseInt(val) >= 0 && parseInt(val) <= 23)) {
      setHours(val)
    }
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === "" || (parseInt(val) >= 0 && parseInt(val) <= 59)) {
      setMinutes(val)
    }
  }

  const handleConfirm = () => {
    if (hours !== "" && minutes !== "") {
      const formattedHours = hours.padStart(2, "0")
      const formattedMinutes = minutes.padStart(2, "0")
      onChange?.(`${formattedHours}:${formattedMinutes}`)
      setOpen(false)
    }
  }

  React.useEffect(() => {
    if (value) {
      const [h, m] = value.split(":")
      setHours(h)
      setMinutes(m)
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal pl-10",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium">Hour</label>
              <Input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={handleHourChange}
                placeholder="HH"
                className="w-16 text-center"
              />
            </div>
            <div className="flex items-end">
              <span className="text-lg font-semibold">:</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium">Minute</label>
              <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={handleMinuteChange}
                placeholder="MM"
                className="w-16 text-center"
              />
            </div>
          </div>
          <Button onClick={handleConfirm} className="w-full" size="sm">
            Confirm
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { TimePicker }
