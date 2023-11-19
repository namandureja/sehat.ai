import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";


export default function PartsSelector({
  parts,
  selectedParts,
  setSelectedParts,
}: {
  parts: string[];
  selectedParts: string[];
  setSelectedParts: (selectedParts: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div className="flex gap-2 flex-wrap">
        {selectedParts.map((part, i) => (
          <Button
            key={i}
            variant="outline"
            onClick={() => {
              setSelectedParts(selectedParts.filter((v) => v !== part));
            }}
          >
            {part}
          </Button>
        ))}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] mt-2 justify-between overflow-hidden"
          >
            <p className="truncate">{"Select body functions..."}</p>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search type..." />
            <CommandEmpty>Invalid type.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-scroll">
              {parts.map((part, i) => (
                <CommandItem
                  key={i}
                  onSelect={(currentValue) => {
                    if (selectedParts.includes(currentValue)) {
                      setSelectedParts(
                        selectedParts.filter((v) => v !== currentValue)
                      );
                    } else {
                      setSelectedParts([...selectedParts, currentValue]);
                    }
                  }}
                  value={part}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedParts.includes(part.toLowerCase())
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {part}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
