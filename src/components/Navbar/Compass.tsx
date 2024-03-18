import * as React from "react"
import { SVGProps } from "react"
export const Compass = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="50mm"
        height="50mm"
        viewBox="0 0 50 50"
    >
        <g transform="translate(0 -247)">
            <circle
                cx={25.202}
                cy={272.065}
                r={23.312}
                style={{
                    opacity: 1,
                    fill: "none",
                    fillOpacity: 1,
                    fillRule: "evenodd",
                    stroke: "#27475b",
                    strokeWidth: 2.86833835,
                    strokeLinecap: "square",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeDashoffset: 0,
                    strokeOpacity: 1,
                    paintOrder: "markers fill stroke",
                }}
            />
            <path
                d="M25.135 290.385v3.97M43.656 271.865h3.969M2.646 271.865h3.969"
                style={{
                    fill: "none",
                    stroke: "#27475b",
                    strokeWidth: 2,
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
            />
            <g
                aria-label="N"
                style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 400,
                    fontStretch: "normal",
                    fontSize: "8.18831825px",
                    lineHeight: 100,
                    fontFamily: "sans-serif",
                    fontVariantLigatures: "normal",
                    fontVariantCaps: "normal",
                    fontVariantNumeric: "normal",
                    fontFeatureSettings: "normal",
                    textAlign: "start",
                    letterSpacing: 0,
                    wordSpacing: 0,
                    textAnchor: "start",
                    fill: "#27475b",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.15353096,
                }}
            >
                <path
                    d="M23.26 256.657v-4.17h-.796v-.695h1.9l2.438 4.322v-3.627h-.788v-.696h2.283v.696h-.82v4.922h-.863l-2.667-4.746v3.994h.796v.696h-2.279v-.696z"
                    style={{
                        fontStyle: "normal",
                        fontVariant: "normal",
                        fontWeight: 400,
                        fontStretch: "normal",
                        fontFamily: "Rockwell",
                        strokeWidth: 0.15353096,
                        fill: "#27475b",
                        fillOpacity: 1,
                    }}
                />
            </g>
        </g>
    </svg>
)
