import { Router } from "express";

import buyersRouter from "./buyersRouter";
import recordsRouter from "./recordsRouter";

const router = Router();

router.use("/records", recordsRouter);
router.use("/buyers", buyersRouter);

export default router;
