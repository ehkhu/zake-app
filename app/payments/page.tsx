import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    // const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    return [
      {
        id: "728ed52f",
        amount: 299,
        status: "success",
        email: "acem@example.com",
      },
      {
        id: "728ed52f",
        amount: 299,
        status: "success",
        email: "acem@example.com",
      },
      {
        id: "34234",
        amount: 299,
        status: "success",
        email: "acem@example.com",
      },
      {
        id: "728e23333d52f",
        amount: 299,
        status: "success",
        email: "acem@example.com",
      },
      {
        id: "32443423424",
        amount: 456,
        status: "success",
        email: "me@example.com",
      },
      {
        id: "728e785678d52f",
        amount: 104560,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed5567856782f",
        amount: 4564,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed567856852f",
        amount: 23425,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed567856752f",
        amount: 2453540017,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728e6578567d52f",
        amount: 234234222399,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728e65781231567d52f",
        amount: 938394903,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728e65785672342d52f",
        amount: 90898009,
        status: "pending",
        email: "m@example.com",
      },
    ]
    
  }

  export default async function Page() {
    const data = await getData()
   
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }