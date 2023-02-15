import { Avatar, Card } from "@mui/material";

type Props = {
  name: string
}
export default function NameCard({ name }: Props) {

  return <Card sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 1 }}>
    <Avatar>{name[0].toUpperCase()}</Avatar>{name}
  </Card>
}
