import React from "react";

export default function DotElement({wantSpace = true}: { wantSpace: boolean }): React.ReactElement {
    return (
        <span>
            •
            {wantSpace && " "}
        </span>
    )
}