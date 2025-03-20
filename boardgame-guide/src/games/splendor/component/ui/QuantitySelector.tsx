import { useState } from "react"
import {Button, TextField} from "@mui/material"
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';


interface QuantitySelectorProps {
    initValue?: number
    min?: number
    max?: number
    onChange?: (newValue: number) => void
}

const QuantitySelector = ({ initValue = 0, min, max, onChange }: QuantitySelectorProps) => {
    const [quantity, setQuantity] = useState(initValue);

    const updateQuantity = (newQuantity: any) => {
        newQuantity = Number(newQuantity)
        if (isNaN(newQuantity)) return
        if (min != undefined && newQuantity < min) return
        if (max != undefined && max < newQuantity) return
        setQuantity(newQuantity)
        onChange?.(newQuantity)
    }

    return (
        <div className="flex flex-col items-center w-full">
            <Button onClick={() => updateQuantity(quantity + 1)}
                    disabled={max != undefined && (quantity >= max)}>
                <ArrowDropUpRoundedIcon />
            </Button>
            <TextField variant="outlined"
                       size="small"
                       value={quantity}
                       onChange={(e) => updateQuantity(e.target.value)} />
            <Button onClick={() => updateQuantity(quantity - 1)}
                    disabled={min != undefined && (min >= quantity)}>
                <ArrowDropDownRoundedIcon />
            </Button>
        </div>
    )
}

export default QuantitySelector