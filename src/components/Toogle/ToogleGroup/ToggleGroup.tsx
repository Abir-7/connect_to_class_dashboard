import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupButton() {
  return (
    <ToggleGroup type="single" className="">
      <ToggleGroupItem
        value="bold"
        aria-label="Toggle bold"
        className="border-[0.5px] border-r-0 px-3"
      >
        View All
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        className=" border-[0.5px] px-3"
      >
        Last 7 Days
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
