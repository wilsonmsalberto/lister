import { FixedSizeList } from 'react-window';
import styled from '@emotion/styled';

export const Grid = styled(FixedSizeList)`
  > div > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    text-overflow: ellipsis;
  }
`;
