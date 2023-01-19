import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  label?: React.ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
  value?: dayjs.ConfigType,
  onChange: (value: dayjs.Dayjs | null, keyboardInputValue?: string) => void;
};

export function DatePicker({ value, ...props }: Props) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        value={dayjs(value)}
        {...props}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default DatePicker;
