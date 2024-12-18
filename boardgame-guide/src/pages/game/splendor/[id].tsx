import {IngameView} from "@/games/splendor/component/IngameView";
import React, {useEffect} from "react";
import {useRouter} from "next/router";

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        console.log(router.query)
    })

    return (
        <div>
            <IngameView/>
        </div>
    )
}