"use client"

import * as React from "react"
import Image from "next/image"
import { Index } from "@/__registry__"
import { Maximize } from "lucide-react"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { CopyButton } from "@/components/copy-button"
import { Icons } from "@/components/icons"
import { StyleSwitcher } from "@/components/style-switcher"
import { ThemeWrapper } from "@/components/theme-wrapper"
import { V0Button } from "@/components/v0-button"
import { Button } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs"
import { styles } from "@/registry/registry-styles"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
}

export function ComponentPreview({
  name,
  type,
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = "center",
  description,
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const [config] = useConfig()
  const index = styles.findIndex((style) => style.name === config.style)
  const [isVisible, toggleVisibility] = React.useState(false)
  const Codes = React.Children.toArray(children) as React.ReactElement[]
  const Code = Codes[index]

  const Preview = React.useMemo(() => {
    const Component = Index[config.style][name]?.component

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name, config.style])

  const codeString = React.useMemo(() => {
    if (
      typeof Code?.props["data-rehype-pretty-code-fragment"] !== "undefined"
    ) {
      const [Button] = React.Children.toArray(
        Code.props.children
      ) as React.ReactElement[]
      return Button?.props?.value || Button?.props?.__rawString__ || null
    }
  }, [Code])

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border">
        <Image
          src={`/r/styles/${config.style}/${name}-light.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 w-[970px] max-w-none bg-background dark:hidden sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <Image
          src={`/r/styles/${config.style}/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 hidden w-[970px] max-w-none bg-background dark:block sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <div className="absolute inset-0 hidden w-[1600px] bg-background md:block">
          <iframe
            src={`/view/styles/${config.style}/${name}`}
            className="size-full"
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className={cn("group relative my-4 flex flex-col space-y-2", className)}
        {...props}
      >
        <Tabs defaultValue="preview" className="relative mr-auto w-full">
          <div className="flex items-center justify-between pb-3">
            {!hideCode && (
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="preview"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Code
                </TabsTrigger>
              </TabsList>
            )}
          </div>
          <TabsContent value="preview" className="relative rounded-md border">
            <div className="flex items-center justify-between p-4">
              <StyleSwitcher />
              <div className="flex items-center gap-2">
                {description ? <V0Button name={name} /> : null}
                <CopyButton
                  value={codeString}
                  variant="outline"
                  className="h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:h-3.5 [&_svg]:w-3.5"
                />
              </div>
            </div>
            <ThemeWrapper defaultTheme="zinc">
              <div
                className={cn(
                  "preview flex min-h-[350px] w-full justify-center p-10",
                  {
                    "items-center": align === "center",
                    "items-start": align === "start",
                    "items-end": align === "end",
                  }
                )}
              >
                <React.Suspense
                  fallback={
                    <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </div>
                  }
                >
                  {Preview}
                </React.Suspense>
              </div>
            </ThemeWrapper>
          </TabsContent>
          <TabsContent value="code">
            <div className="relative flex flex-col space-y-4">
              <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    "absolute right-10 top-4 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
                  )}
                  onClick={() => toggleVisibility(!isVisible)}
                >
                  <span className="sr-only">Maximize</span>
                  <Maximize />
                </Button>
                {Code}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Dialog open={isVisible} onOpenChange={toggleVisibility}>
        <DialogContent className="max-h-5/6 flex h-fit min-w-[800px] flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="h-full w-full rounded-md [&_pre]:my-0 [&_pre]:overflow-auto">
            {Code}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
