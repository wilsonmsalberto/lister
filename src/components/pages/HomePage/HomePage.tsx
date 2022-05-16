import { useCallback, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { getData, Data } from '@/pages/api/results';

const List = dynamic(
  () => {
    const promise = import('@/components/ui/List').then((module) => module.List);
    return promise;
  },
  {
    ssr: false,
  },
);

export const HomePage = () => {
  const itemsPerPage = 10;
  // All items since there's no actual pagination
  const [data, setData] = useState<Data[] | null>();

  // Simulates pagination by saving parts of a list
  const [items, setItems] = useState<Data[] | []>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const loadNextPage = useCallback(async () => {
    if (!data) {
      return;
    }

    const hasNextPage = data ? !!data?.length : false;
    const page = hasNextPage ? currentPage + 1 : currentPage;

    setHasNextPage(hasNextPage);
    setCurrentPage(page);

    if (hasNextPage) {
      const newItems = data.slice(0, itemsPerPage);

      setItems((prev) => [...prev, ...newItems]);

      // Simulates removal of items from loaded page
      setData(data.slice(itemsPerPage));
    }
  }, [currentPage, data]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      // Should be a paginated API
      const { results } = (await getData()) ?? {};

      // Prevent setting data if it doesn't exist
      if (results.length > 0) {
        const hasNextPage = results ? !!results?.length : false;
        const newItems = results.slice(0, itemsPerPage);

        // Ensure we set the next page
        setHasNextPage(hasNextPage);

        // Load first page items
        setItems(newItems);

        // Load remaining data
        setData(results.slice(itemsPerPage));
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Metrics
        </Typography>

        <Box sx={{ my: 4, height: '100vh' }}>
          {!data ? (
            'Loading...'
          ) : (
            <List hasNextPage={hasNextPage} items={items} loadNextPage={loadNextPage} />
          )}
        </Box>
      </Box>
    </Container>
  );
};
