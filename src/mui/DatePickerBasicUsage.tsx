import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import DatePicker from "./DatePicker";

export default function DatePickerBasicUsage() {
  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-01-13Z'));

  return (
    <DatePicker
      label="Basic example"
      value={value}
      onChange={(newValue) => {
        console.log('newValue', {
          newValue,
          toDate: newValue?.toDate(),
          localDateString: newValue?.format('L'),
          isoString: newValue?.toISOString(),
          isoDateString: newValue?.format('YYYY-MM-DD'),
        })
        setValue(newValue);
      }}
    />
  );
}
