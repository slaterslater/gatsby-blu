import * as React from 'react'

function LongArrowRight(props) {
  return (
    <svg
      width={77}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M72.354 4.354a.5.5 0 000-.708L69.172.464a.5.5 0 10-.707.708L71.293 4l-2.829 2.828a.5.5 0 10.708.708l3.182-3.182zM4 4.5h68v-1H4v1z"
        fill="currentColor"
      />
      <defs>
        <filter
          id="Arrow_3_svg__filter0_d_344:174"
          x={0}
          y={0.318}
          width={76.5}
          height={15.364}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_344:174"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_344:174"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default LongArrowRight
