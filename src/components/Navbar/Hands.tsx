import * as React from "react"
import { SVGProps } from "react"
export const Hands = (props: SVGProps<SVGSVGElement>, { color }: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
    >
        <path
            d="m23.331 273.936-7.483-11.225 11.225 7.483 7.484 11.225z"
            style={{
                fill: "#27475b",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.18738329,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                strokeDasharray: "none",
                strokeOpacity: 1,
            }}
            transform="translate(0 -247)"
        />
    </svg>
)
