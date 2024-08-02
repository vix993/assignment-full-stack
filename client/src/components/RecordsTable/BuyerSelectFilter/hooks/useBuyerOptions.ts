import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BuyerOption, BuyersResponse } from "./UseBuyerOptions.Types";

// Hook to fetch paginated buyers
// TODO: handle pagination
// rather than just search
const useBuyerOptions = ({
  q = "",
  limit = 10,
  initialOffset = 0,
  fetchOnMount = false,
}) => {
  const [data, setData] = useState<BuyerOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchBuyers = useCallback(
    async (newQuery: string) => {
      setIsLoading(true);

      try {
        const response = await axios.get<BuyersResponse>(
          "http://localhost:3000/api/buyers",
          {
            params: { q: newQuery, limit, offset: initialOffset }, // Use initialOffset here
          }
        );

        const newBuyers = response.data.buyers.map((buyer) => ({
          value: buyer.id,
          text: buyer.name,
        }));

        setData(newBuyers);
        setHasMore(!response.data.endOfResults);
      } catch (error) {
        console.error("Error fetching buyers:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [limit, initialOffset]
  );

  useEffect(() => {
    if (fetchOnMount || !Object.keys(data).length) {
      fetchBuyers(q);
    }
  }, [fetchOnMount, q, fetchBuyers]);

  return { data, isLoading, hasMore, refetch: fetchBuyers };
};

export default useBuyerOptions;
