"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
};

export function DateRangePicker({ start, end, onChange }: Props) {
  return (
    <div className="flex flex-row gap-8 justify-center items-end my-8">
      <div className="flex flex-col gap-2">
        <Label htmlFor="start" className="font-semibold">
          From
        </Label>
        <Input
          id="start"
          type="date"
          value={start}
          onChange={(e) => onChange(e.target.value, end)}
          className="w-40 text-lg rounded-xl border-2 border-gray-200"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="end" className="font-semibold">
          To
        </Label>
        <Input
          id="end"
          type="date"
          value={end}
          onChange={(e) => onChange(start, e.target.value)}
          className="w-40 text-lg rounded-xl border-2 border-gray-200"
        />
      </div>
    </div>
  );
}
