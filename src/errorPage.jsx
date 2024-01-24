import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() ;
    return(
        <>
            <h1> Error Page </h1>
            <Typography> { error.statusText || error.message } </Typography>
        </>
    ) ;
}