import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
// import { Button } from "@/registry/new-york/ui/button";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function Pagination({
  isLoading,
  current_page,
  next_page_url,
  from,
  path,
  per_page,
  prev_page_url,
  to,
  total,
  last_page,
}: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(total / per_page); //Math.ceil(count / PAGE_SIZE);

  function firstPage() {
    const next = 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", next.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  function lastPage() {
    const next = last_page;
    const params = new URLSearchParams(searchParams);
    params.set("page", next.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", next.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", prev.toString());
    replace(`${pathname}?${params.toString()}`);
  }
  function changePageSize(pageSize: string) {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", pageSize.toString());
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }
  if (pageCount <= 1) return null;
  {
    /* paignation */
  }
  return (
    
    <>
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {`${from}`} to {`${to}`} of {total} row(s).
      </div>
      <div className="flex items-center space-x-4 lg:space-x-8">
        <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${per_page}`}
          onValueChange={(value) => {
            changePageSize(value);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={per_page} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {current_page} of {last_page}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => firstPage()}
            disabled={currentPage === 1 || isLoading}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => prevPage()}
            disabled={currentPage === 1 || isLoading}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => nextPage()}
            disabled={currentPage === pageCount || isLoading}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => lastPage()}
            disabled={currentPage === pageCount || isLoading}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
    </>
    
  );
}
