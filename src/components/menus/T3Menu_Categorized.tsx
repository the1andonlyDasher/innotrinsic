

import { renderT3Menu } from "@/utils/renderT3Menu";
import { FunctionComponent, useEffect, useState } from "react";

interface T3Menu_CategorizedProps {
    data?: any
}

const T3Menu_Categorized: FunctionComponent<T3Menu_CategorizedProps> = (props: T3Menu_CategorizedProps) => {
    const [stableData, setData]: any = useState<any>(
        props.data)

    const cont = renderT3Menu({ data: stableData })

    return (<>
        {/* {stableData && cont} */}
    </>);
}

export default T3Menu_Categorized;

