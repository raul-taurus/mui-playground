import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import DatePickerBasicUsage from "./mui/DatePickerBasicUsage";

function Playground() {
  const theme = useTheme();
  return (
    <Box sx={{ p: theme.spacing(2) }}>
      <DatePickerBasicUsage />
    </Box>
  );
}

export default Playground;
