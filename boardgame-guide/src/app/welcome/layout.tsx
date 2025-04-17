import React, {ReactNode} from "react"

interface LayoutProps {
    readonly children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <main>{children}</main>
    )
}
