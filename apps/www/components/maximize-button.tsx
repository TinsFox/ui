"use client"

import * as React from "react"
import { Maximize } from "lucide-react"

import { Event } from "@/lib/events"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"

interface MaximizeButtonProps extends ButtonProps {
  value: string
  src?: string
  event?: Event["name"]
}

export function MaximizeButton({
  value,
  className,
  variant = "ghost",
  event,
  ...props
}: MaximizeButtonProps) {
  console.log("value: ", value)
  console.log("props: ", props)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant={variant}
          className={cn(
            "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
            className
          )}
          onClick={() => {}}
          {...props}
        >
          <span className="sr-only">Copy</span>
          <Maximize />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
            {value}
            {/* {Code} */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
