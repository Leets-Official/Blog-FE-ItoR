import { css } from 'styled-components';

export type ButtonVariant =
  | 'primary'
  | 'primary-outline'
  | 'secondary'
  | 'secondary-filled'
  | 'black'
  | 'negative'
  | 'kakao';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonRounded = 'sm' | 'md' | 'full';

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: ${({ theme }) => theme.COLORS.point};
    color: ${({ theme }) => theme.COLORS.white};
    border: none;
  `,

  'primary-outline': css`
    background-color: ${({ theme }) => theme.COLORS.white};
    color: ${({ theme }) => theme.COLORS.point};
    border: 1px solid ${({ theme }) => theme.COLORS.point};
  `,

  secondary: css`
    background-color: ${({ theme }) => theme.COLORS.white};
    color: ${({ theme }) => theme.COLORS.gray[56]};
    border: 1px solid ${({ theme }) => theme.COLORS.gray[56]};
  `,
  'secondary-filled': css`
    background-color: ${({ theme }) => theme.COLORS.white};
    color: ${({ theme }) => theme.COLORS.gray[56]};
    border: none;
  `,
  black: css`
    background-color: ${({ theme }) => theme.COLORS.gray[7]};
    color: ${({ theme }) => theme.COLORS.white};
    border: none;
  `,
  negative: css`
    background-color: ${({ theme }) => theme.COLORS.negative};
    color: ${({ theme }) => theme.COLORS.white};
    border: none;
  `,
  kakao: css`
    background-color: ${({ theme }) => theme.COLORS.kakao};
    color: ${({ theme }) => theme.COLORS.black};
    border: none;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  `,
};

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  xs: css`
    width: 64px;
    height: 38px;
    padding: 8px 12px;
  `,
  sm: css`
    width: 99px;
    height: 38px;
    padding: 8px 12px;
  `,
  md: css`
    width: 141px;
    height: 38px;
    padding: 8px 12px;
  `,
  lg: css`
    width: 312px;
    height: 45px;
    padding: 0px 14px;
  `,
  xl: css`
    width: 656px;
    height: 38px;
    padding: 8px 12px;
  `,
};

const roundedStyles: Record<ButtonRounded, ReturnType<typeof css>> = {
  sm: css`
    border-radius: 2px;
  `,
  md: css`
    border-radius: 6px;
  `,
  full: css`
    border-radius: 25px;
  `,
};

export { variantStyles, sizeStyles, roundedStyles };
