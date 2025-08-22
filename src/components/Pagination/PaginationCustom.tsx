import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IMeta {
  totalItem: number;
  totalPage: number;
  limit: number;
  page: number;
}

interface Props {
  meta: IMeta;
  onPageChange: (page: number) => void;
}

export function PaginationCustom({ meta, onPageChange }: Props) {
  const { totalPage, page } = meta;

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPage);
      } else if (page >= totalPage - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPage - 4; i <= totalPage; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = page - 2; i <= page + 2; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPage);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <Pagination className="w-full">
      <PaginationContent className="flex justify-between w-full items-center px-4">
        {/* Previous */}
        <PaginationItem className="border rounded-md">
          <PaginationPrevious
            onClick={() => page > 1 && onPageChange(page - 1)}
            className={`${
              page === 1 ? "pointer-events-none opacity-50" : ""
            } text-[14px] text-[#3F5972] hover:text-[#3F5972] font-semibold`}
          />
        </PaginationItem>

        {/* Numbers */}
        <div className="flex gap-2">
          {pages.map((p, idx) =>
            p === "..." ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={`page-${p}`}>
                <PaginationLink
                  className={`${
                    p === page
                      ? "text-[#359AB1] active:border-none border-[#EDFBFE] bg-[#EDFBFE]"
                      : "text-[#91A0AE] border-none"
                  } hover:bg-[#EDFBFE] hover:border-[#EDFBFE]  hover:text-[#359AB1]`}
                  onClick={() => onPageChange(p as number)}
                  isActive={p === page}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        </div>

        {/* Next */}
        <PaginationItem className="border rounded-md">
          <PaginationNext
            onClick={() => page < totalPage && onPageChange(page + 1)}
            className={`${
              page === totalPage ? "pointer-events-none opacity-50" : ""
            } text-[14px] text-[#3F5972] hover:text-[#3F5972] font-semibold `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
