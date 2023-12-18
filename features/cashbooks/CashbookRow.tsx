import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { CreateCashbookForm } from "./CreateCashbookForm";
import { useState } from "react";
// import { useDeleteCashbook } from "./useDeleteCashbook";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

/*
"cashbook date",
  "cashbook on", // cashbook_type.name
  "notes",
  "amount",
  
*/
export function CashbookRow({ cashbook,selectedIds,onHandlecheck }: any) {
  
  const { toast } = useToast();
  const [openDelete, setOpenDelete] = useState(false);
  const [idToDelete, setidToDelete] = useState();
  const {
    id,
  transaction_type,
  transaction_date,
  description,
  amount,
  } = cashbook;
  function onError(errors: any) {
      // Handle other types of errors
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.message,
      });
  }
  return (
    <TableRow>
      <TableCell className="py-2">
        <Checkbox
        checked={Array.from(selectedIds).includes(id)}
        onCheckedChange={()=>onHandlecheck(id)}
        />
      </TableCell>
      <TableCell className="py-2">{transaction_date}</TableCell>
      <TableCell className="py-2">{transaction_type=='expense'?<Badge variant="destructive">{transaction_type}</Badge>:<Badge variant="secondary">{transaction_type}</Badge>}</TableCell>
      <TableCell className="py-2">{description}</TableCell>
      <TableCell className="py-2 font-bold text-right">{amount}</TableCell>
    </TableRow>
  );
}
