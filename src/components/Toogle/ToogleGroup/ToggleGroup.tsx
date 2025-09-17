import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ToggleOption {
  label: string;
  value: string;
}

interface Props {
  options: ToggleOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function ToggleGroupButton({ options, defaultValue, onChange }: Props) {
  return (
    <ToggleGroup
      type="single"
      defaultValue={defaultValue}
      onValueChange={(val) => val && onChange?.(val)}
      className="border rounded-md overflow-hidden"
    >
      {options.map((opt, idx) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          aria-label={`Toggle ${opt.label}`}
          className={`px-3 w-24 leading-6 text-sm data-[state=on]:bg-gray-200 ${
            idx !== options.length - 1 ? "border-r" : ""
          }`}
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
