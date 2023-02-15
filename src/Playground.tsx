import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import BoxUsage from "./mui/BoxUsage";

function Playground() {
  const theme = useTheme();
  return (
    <Box sx={{ p: theme.spacing(2) }}>
      {/* <DatePickerBasicUsage /> */}
      <BoxUsage />
    </Box>
  );
}

export default Playground;
