import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]",
        "before:absolute before:inset-0 before:animate-[shimmer_2s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
      style={{
        animation: "shimmer 2s ease-in-out infinite",
        backgroundSize: "200% 100%"
      }}
      {...props}
    />
  )
}

export { Skeleton }
