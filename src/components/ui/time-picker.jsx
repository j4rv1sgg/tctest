import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { addHours, startOfHour, isToday } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ceilToHour = (date) => startOfHour(addHours(date, 1));

const generateTimeRange = (start, end) => {
  const times = [];
  for (let i = start; i <= end; i++) {
    times.push(`${i.toString().padStart(2, '0')}:00`);
  }
  return times;
};

export default function TimePicker({ control, watch, setValue }) {
  const visitDate = watch('visitDate');
  const from = watch('from');

  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);

  useEffect(() => {
    if (visitDate) {
      if (isToday(visitDate)) {
        const currentHour = ceilToHour(new Date()).getHours();
        setFromOptions(generateTimeRange(currentHour + 2, 22));
      } else {
        setFromOptions(generateTimeRange(0, 22));
      }
      setValue('from', '');
      setValue('to', '');
    }
  }, [visitDate, setValue]);

  useEffect(() => {
    if (from) {
      const fromHour = parseInt(from.split(':')[0], 10);
      setToOptions(generateTimeRange(fromHour + 1, 23));
    } else {
      setToOptions(generateTimeRange(0, 23));
    }
    setValue('to', '');
  }, [from, setValue]);

  return (
    <div className="flex gap-2">
      <Controller
        name="from"
        control={control}
        render={({ field }) => (
          <div className="flex-1">
            <Select
              {...field}
              onValueChange={(value) => field.onChange(value)} 
              value={field.value} 
              className="flex-auto"
              disabled={!fromOptions.length}
            >
              <SelectTrigger className="flex-auto border-0 border-b-2 rounded-none">
                <SelectValue placeholder="Od" />
              </SelectTrigger>
              <SelectContent>
                {fromOptions.map((time, i) => (
                  <SelectItem key={i} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <Controller
        name="to"
        control={control}
        render={({ field }) => (
          <div className="flex-1">
            <Select
              {...field}
              onValueChange={(value) => field.onChange(value)} 
              value={field.value} 
              className="flex-auto border rounded-md p-2"
              disabled={!toOptions.length}
            >
              <SelectTrigger className="flex-auto border-0 border-b-2  rounded-none">
                <SelectValue placeholder="Do" />
              </SelectTrigger>
              <SelectContent>
                {toOptions.map((time, i) => (
                  <SelectItem key={i} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />
    </div>
  );
}
