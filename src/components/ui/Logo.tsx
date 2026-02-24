export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ВКС стилизованный логотип */}
      <rect x="0" y="8" width="4" height="24" fill="#2E5BFF" />
      <path
        d="M8 8L16 20L8 32H14L22 20L14 8H8Z"
        fill="white"
      />
      <path
        d="M24 8L32 20L24 32H30L38 20L30 8H24Z"
        fill="white"
      />
      <text
        x="46"
        y="27"
        fontFamily="Inter, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="white"
      >
        ВКС
      </text>
      <text
        x="46"
        y="36"
        fontFamily="Inter, sans-serif"
        fontSize="6"
        fontWeight="400"
        fill="#A0A0A0"
      >
        ГРУППА КОМПАНИЙ
      </text>
    </svg>
  )
}