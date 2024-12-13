'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';

export function CustomDatePicker({ name, control, defaultValue }) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const isDateDisabled = (date) => {
    const today = new Date();
    const maxDate = addDays(today, 3);
    return date < addDays(today, -1) || date > maxDate;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full p-0 border-0 border-b-2 text-[16px] justify-start text-left font-normal',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value && typeof field.value !== 'string' ? (
                format(field.value, 'PPP')
              ) : (
                <div className=" w-full flex items-center justify-between pr-2">
                  <span className="text-[16px] text-[#6D7178]">
                    {defaultValue}
                  </span>
                  <ChevronDown className="text-[#989ca3] w-24 h-24" />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value || selectedDate}
              onSelect={(date) => {
                const newDate = date || defaultValue;
                field.onChange(newDate); 
                setSelectedDate(newDate); 
              }}
              disabled={isDateDisabled}
              weekStartsOn={1}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
