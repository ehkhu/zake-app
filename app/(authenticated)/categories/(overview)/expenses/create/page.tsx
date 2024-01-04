import { CreateExpenseTypeForm } from "@/features/expenseTypes/CreateExpenseTypeForm";

export default function CreateExpenseType(params:any) {
    return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-black-100">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Add Expense Category</h2>
          </div>
        </div>
        <div className="w-[850px] m-0">
          <CreateExpenseTypeForm></CreateExpenseTypeForm>    
        </div>
      </div>
    )
    
}