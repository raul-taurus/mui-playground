import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import BoxUsage from "./mui/BoxUsage";
import { Clock } from "./mui/Clock";
import { ColorPlate } from "./mui/ColorPlate";
import { LoaderTest } from "./test/loader-test";

function Playground() {
  const theme = useTheme();
  return (
    <Box sx={{ p: theme.spacing(2) }}>
      {/* <DatePickerBasicUsage /> */}
      {/* <BoxUsage /> */}
      {/* <LoaderTest /> */}
      <ColorPlate/>
    </Box>
  );
}

export default Playground;
