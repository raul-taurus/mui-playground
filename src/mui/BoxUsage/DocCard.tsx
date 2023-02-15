import { Card } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';

type Props = {
  name: string
}
export default function DocCard({ name }: Props) {

  return <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, gap: 1 }}>
    <AssignmentIcon />
    {name}
  </Card>
}
