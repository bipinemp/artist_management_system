import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

type Props = {
  isPending: boolean;
  page: number;
  nextPage: () => void;
  prevPage: () => void;
  totalPages: number | undefined;
  data: any[] | undefined;
  tableName: string;
};

const TableFooter = ({
  isPending,
  data,
  tableName,
  page,
  prevPage,
  nextPage,
  totalPages,
}: Props) => {
  return (
    <>
      {isPending && (
        <div className="mb-3 mt-6 w-full flex items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}

      {data?.length === 0 && (
        <h3 className="w-full text-destructive font-bold text-center py-4">
          Currently, no {tableName} found.
        </h3>
      )}

      {data && data.length > 0 && (
        <div className="mt-5 w-full flex items-center gap-x-2 justify-between sm:justify-end py-4 px-2 place-self-end justify-self-end">
          <Button
            onClick={prevPage}
            disabled={page === 1}
            className="flex items-center gap-x-2"
          >
            <ChevronLeft />
            <span>Prev</span>
          </Button>

          <p>
            {page}/{totalPages}
          </p>

          <Button
            onClick={nextPage}
            disabled={page === totalPages}
            className="flex items-center gap-x-2"
          >
            <span>Next</span>
            <ChevronRight />
          </Button>
        </div>
      )}
    </>
  );
};

export default TableFooter;
