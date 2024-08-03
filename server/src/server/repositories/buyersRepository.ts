import { Buyer } from "../db/Buyer";
import { ProcurementRecord } from "../db/ProcurementRecord";
import unique from "../helpers/unique";
import { BuyerSearchFilters } from "../models";
import sequelize from "../sequelize";

/**
 * Queries the database for buyers according to the search filters.
 */
async function searchBuyers(
  { textSearch }: BuyerSearchFilters,
  offset: number,
  limit: number
): Promise<Buyer[]> {
  if (textSearch) {
    return await sequelize.query(
      "SELECT * FROM buyers WHERE name LIKE :textSearch LIMIT :limit OFFSET :offset",
      {
        model: Buyer, // by setting this sequelize will return a list of Buyer objects
        replacements: {
          textSearch: `%${textSearch}%`,
          offset: offset,
          limit: limit,
        },
      }
    );
  } else {
    return await sequelize.query(
      "SELECT * FROM buyers LIMIT :limit OFFSET :offset",
      {
        model: Buyer,
        replacements: {
          offset: offset,
          limit: limit,
        },
      }
    );
  }
}

async function getUniqueBuyerIds(records: ProcurementRecord[]) {
  // Get unique buyer ids for the selected records
  const buyerIds = unique(records.map((pr) => pr.buyer_id));

  // Fetch the buyer data in one query
  const buyers = await sequelize.query(
    "SELECT * FROM buyers WHERE id IN (:buyerIds)",
    {
      model: Buyer,
      replacements: {
        buyerIds,
      },
    }
  );
  return buyers;
}

export default { searchBuyers, getUniqueBuyerIds };
