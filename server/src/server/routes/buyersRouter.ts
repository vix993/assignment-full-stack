import { Router } from "express";
import { BuyerSearchQuery, BuyerSearchResponse } from "../models/api_types";
import buyersRepository from "../repositories/buyersRepository";

const router = Router();

// TODO: extract business logic into service
router.get("/", async (req, res) => {
  const query = req.query as any as BuyerSearchQuery;

  const { limit = 10, offset = 0 } = query;

  if (limit === 0 || limit > 100) {
    res.status(400).json({ error: "Limit must be between 1 and 100." });
    return;
  }

  const buyers = await buyersRepository.searchBuyers(
    { textSearch: query.q },
    offset,
    limit + 1
  );

  const response: BuyerSearchResponse = {
    buyers: buyers
      .slice(0, limit)
      .map((buyer) => ({ id: buyer.id, name: buyer.name })),
    endOfResults: buyers.length <= limit, // in this case we've reached the end of results
  };

  res.json(response);
});

export default router;
