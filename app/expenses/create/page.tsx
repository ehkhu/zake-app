import { CreateExpenseForm } from "@/features/expenses/CreateExpenseForm";
import { getExpensesData } from "@/services/apiExpenses";

export default async function CreateExpense(params:any) {
  const data = await getExpensesData();   
    return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-black-100">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Add Expense</h2>
            <p className="text-muted-foreground">
              Create a expense
            </p>
          </div>
        </div>
        <div className="w-[850px] m-0">
          <CreateExpenseForm expensesValues={data.data}></CreateExpenseForm>    
        </div>
      </div>
    )
    
}