import { Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function hex(v: number) {
    return v.toString(16).padStart(2, '0')
}
export function ColorPlate() {
    const boxRef = useRef<HTMLDivElement>();
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.style.backgroundColor = `#${hex(color.r)}${hex(color.g)}${hex(color.b)}`
        }
    }, [color.b, color.g, color.r])

    return <Box>
        <Box ref={boxRef} sx={{ width: 300, height: 300, }}></Box>
        <Box sx={{ mt: 4 }}>
            <TextField
                id="r"
                label="Red"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ max: 255, min: 0 }} value={color.r} onChange={(u) => { setColor(v => ({ ...v, r: Number(u.target.value) })) }}
            />
            <TextField
                id="g"
                label="Green"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ max: 255, min: 0 }} value={color.g} onChange={(u) => { setColor(v => ({ ...v, g: Number(u.target.value) })) }}
            />
            <TextField
                id="b"
                label="Blue"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ max: 255, min: 0 }} value={color.b} onChange={(u) => { setColor(v => ({ ...v, b: Number(u.target.value) })) }}
            />
        </Box>
    </Box>
}