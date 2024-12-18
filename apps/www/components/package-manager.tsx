"use client"

import { useConfig } from "@/hooks/use-config"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"

export function PackageManager() {
  const [config, setConfig] = useConfig()

  const packageManager = config.packageManager || "pnpm"

  return (
    <Select
      value={packageManager}
      onValueChange={(value) => {
        setConfig({
          ...config,
          packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
        })
      }}
    >
      <SelectTrigger className="w-[80px] border-none shadow-none">
        <SelectValue placeholder="Pick you package manager" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pnpm">pnpm</SelectItem>
        <SelectItem value="npm">npm</SelectItem>
        <SelectItem value="yarn">yarn</SelectItem>
        <SelectItem value="bun">bun</SelectItem>
      </SelectContent>
    </Select>
  )
}
