import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overviews
      </Link>
      <Link
        href="/appointments"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Appointments
      </Link>
      <Link
        href="/expenses"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Expenses
      </Link>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Entry</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>Categories</DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <Link
        href="/categories/treatments"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
        Treatment Types
        </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link
        href="/categories/expenses"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
        Expense Types
        </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link
        href="/patients"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
        Patients
        </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Link
        href="/dentists"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
        Dentists
        </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </nav>
  )
}
