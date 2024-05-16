import { Request, Response } from "express";
import { response } from "../../../utils/response";
import { CustomRequest } from "../../../types/express";
import { ActorService } from "../../../domain/services/ActorService";

const actorService = new ActorService();

export const createActor = async (req: CustomRequest, res: Response) => {
  const { movieId } = req.params;
  const { name } = req.body;

  await actorService.createActor({ name, movieId });
  response(res, { statusCode: 201, message: "Actor created" });
};

export const getActorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const actors = await actorService.getActorById(id);
  console.table(actors);
  response(res, { statusCode: 200, data: actors, message: "OK" });
};

export const deleteActorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await actorService.deleteActorById(id);
  response(res, { statusCode: 200, message: "Actor deleted" });
};

export const updateActorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, movieId } = req.body;
  await actorService.updateActorById(id, name, movieId);
  response(res, { statusCode: 200, message: "Actor updated" });
};
