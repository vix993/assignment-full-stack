import { Router } from "express";
import procurementRecordsFactory from "../factories/procurementRecordsFactory";
import { RecordSearchRequest, RecordSearchResponse } from "../models/api_types";
import procurementRecordsRepository from "../repositories/procurementRecordsRepository";

const router = Router();

/**
 * This endpoint implements basic way to paginate through the search results.
 * It returns a `endOfResults` flag which is true when there are no more records to fetch.
 */
// TODO: extract business logic into service
router.post("/", async (req, res) => {
  const requestPayload = req.body as RecordSearchRequest;

  const { limit, offset } = requestPayload;

  if (limit === 0 || limit > 100) {
    res.status(400).json({ error: "Limit must be between 1 and 100." });
    return;
  }

  // We fetch one more record than requested.
  // If number of returned records is larger than
  // the requested limit it means there is more data than requested
  // and the client can fetch the next page.
  const records = await procurementRecordsRepository.searchRecords(
    {
      textSearch: requestPayload.textSearch,
      buyerId: requestPayload.buyerId,
    },
    offset,
    limit + 1
  );

  const response: RecordSearchResponse = {
    records: await procurementRecordsFactory.serializeProcurementRecords(
      records.slice(0, limit) // only return the number of records requested
    ),
    endOfResults: records.length <= limit, // in this case we've reached the end of results
  };

  res.json(response);
});

export default router;
