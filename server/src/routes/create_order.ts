import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { db } from "../connection";

export default async function createOrder(req: Request, res: Response): Promise<void> {
    let uniqueId: string = uuidv4();

    try {
        const existingOrderIds: string[] = await db("orders").select("id");
        let isUnique: boolean = !existingOrderIds.includes(uniqueId);
        while (!isUnique) {
            uniqueId = uuidv4();
            isUnique = !existingOrderIds.includes(uniqueId);
        }

        await db("orders").insert({ id: uniqueId, status: "pending" });
        console.log(`[server] Order with ID ${uniqueId} inserted`);
        res.status(200).json({ uniqueId });
    } catch (error: unknown) {
        console.error((error as Error).message);
        res.status(500).send("Server error");
    }
}
