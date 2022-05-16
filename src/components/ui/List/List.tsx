import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Data } from '@/pages/api/results';
import { Row } from '@/components/ui/Row';
import { Grid } from './List.styles';

type List = {
  hasNextPage: boolean;
  items: Data[];
  loadNextPage: () => void;
};

type ListItemType = {
  index: number;
  style: object;
};

export const List = ({ hasNextPage, items, loadNextPage }: List) => {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  const ListItem = ({ index, style }: ListItemType) => {
    return (
      <div style={style}>
        <Row item={items[index]} />
      </div>
    );
  };

  return (
    <AutoSizer defaultHeight={1000}>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={(index) => index < items.length}
          itemCount={itemCount}
          loadMoreItems={loadNextPage}
        >
          {({ onItemsRendered, ref }) => (
            <Grid
              height={height}
              width={width}
              itemCount={itemCount}
              itemSize={30}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {ListItem}
            </Grid>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};
