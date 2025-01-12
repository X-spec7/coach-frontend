declare module 'react-progressbar-semicircle' {
  import { Component } from 'react';

  interface SemiCircleProgressBarProps {
    percentage: number;
    showPercentValue?: boolean;
    stroke?: string;
    background?: string;
    strokeWidth?: number;
    diameter?: number;
    style?: React.CSSProperties;
    animationDuration?: number;
  }

  class SemiCircleProgressBar extends Component<SemiCircleProgressBarProps> {}

  export default SemiCircleProgressBar;
}
