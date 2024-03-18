import { FunctionComponent } from "react";

interface ShowErrorProps {
    fatal?: boolean,
    unhandled?: boolean,
    statusCode?: number | undefined,
    statusMessage?: any,
    data?: any,
    message?: string
}

const ShowError: FunctionComponent<ShowErrorProps> = (props: ShowErrorProps) => {
    return (<div className="w-full h-full fixed top-0 left-0">
        <h1>{props.statusCode}</h1>
        <h2>{props.fatal ? "Fatal" : "Not fatal"}</h2>
        <h3>{props.unhandled ? "Unhandled" : "handled"}</h3>
        <p>{props.statusMessage}</p>
        <div>
            {props.data}
        </div>
        <p>{props.message}</p>
    </div>);
}

export default ShowError;