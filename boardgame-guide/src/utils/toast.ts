import {addToast} from "@heroui/react";

export function toast({title, description, autoClose}:
                      {title?: string, description?: string, autoClose?: number}) {
    addToast({
        title,
        description,
        timeout: autoClose
    })
}