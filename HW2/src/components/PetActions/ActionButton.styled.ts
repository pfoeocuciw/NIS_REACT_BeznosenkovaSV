import styled from 'styled-components';

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-top: 0.3rem;
  background-color: ${({ $variant }) =>
    $variant === 'secondary' ? '#334155' : '#00bcd4'};
  color: #e0f7fa;
  opacity: ${({ disabled }) => (disabled ? 0.45 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.9);
    background-color: ${({ $variant }) =>
    $variant === 'secondary' ? '#475569' : '#02c9e5'};
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;
