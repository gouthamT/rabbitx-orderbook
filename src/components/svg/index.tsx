interface SvgProps {
  fill?: string;
  width?: number;
  height?: number;
}

export const DownIcon = ({
  fill = "none",
  width = 16,
  height = 16,
}: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={fill}
  >
    <path
      d="M13.5081 13.0081L3.49207 2.99202M13.5081 13.0081L5.27297 13.0081M13.5081 13.0081L13.5081 4.2538"
      stroke="#FF475D"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const UpIcon = ({
  fill = "#19EAAB",
  width = 16,
  height = 16,
}: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={fill}
  >
    <path
      d="M13.0007 2.99927L2.99915 13.0009M13.0007 2.99927L4.76565 3.01195M13.0007 2.99927L13.0142 11.7535"
      stroke="#19EAAB"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
