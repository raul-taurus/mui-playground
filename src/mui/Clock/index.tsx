import { Box, Typography } from "@mui/material";
import { Property } from 'csstype';
import { useEffect, useRef, useState } from "react";

type ClockPointerProps = {
  rotate: number;
  color: Property.Color;
  length: number;
  width: number;
}
function ClockPointer({ rotate, color, width, length, }: ClockPointerProps) {
  const ref = useRef<HTMLDivElement>()
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `rotate(${rotate - 90}deg)`;
    }
  }, [rotate])
  return <Box ref={ref} sx={{ width: '100%', position: 'absolute', marginTop: `-${width}px`, top: '50%', display: 'flex', }}>
    <Box sx={{ width: '50%' }}></Box>
    <Box sx={{ width: '50%', display: 'flex' }}>
      <Box sx={{ width: `${length}%`, border: `${width}px solid ${color}`, }}></Box>
      <Box sx={{ width: `${100 - length}%`, }}></Box>
    </Box>
  </Box>
}

function formatNumber(n: number) {
  return n.toLocaleString('en-US', { minimumIntegerDigits: 2, })
}

export function Clock() {

  const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const t = new Date();
      setTime({ hour: t.getHours(), minute: t.getMinutes(), second: t.getSeconds() })
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])

  return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
    <Box sx={{ border: '1px solid black', width: 300, height: 300, borderRadius: 150, position: 'relative' }}>
      <ClockPointer rotate={360.0 / 12 * (time.hour % 12 + time.minute / 60)} color='red' width={2} length={55} />
      <ClockPointer rotate={360.0 / 60 * (time.minute + time.second / 60)} color='gold' width={1.6} length={70} />
      <ClockPointer rotate={360.0 / 60 * time.second} color='green' width={0.7} length={90} />
    </Box>
    <Typography sx={{ fontSize: '3rem', mt: 2, textAlign: 'center' }}>
      {formatNumber(time.hour)}:{formatNumber(time.minute)}:{formatNumber(time.second)}
    </Typography>
    {/* <input style={{ textAlign: 'right' }} type='number' value={time.hour} min={0} max={24} onChange={(e) => {
      const v = Number(e.target.value);
      setTime(t => ({ ...t, hour: v >= 24 ? 0 : v }))
    }} />
    <input style={{ textAlign: 'right' }} type='number' value={time.minute} min={0} max={60} onChange={(e) => {
      const v = Number(e.target.value);
      setTime(t => ({ ...t, hour: v >= 60 ? t.hour + 1 : t.hour, minute: v >= 60 ? 0 : v }))
    }} /> */}
  </Box>
}