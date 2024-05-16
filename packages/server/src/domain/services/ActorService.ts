import { ActorRepository } from "../../infrastructure/repositories/ActorRepository";
import { NewActor } from "../entities/Actor";

export class ActorService {
  private actorRepository: ActorRepository;

  constructor() {
    this.actorRepository = new ActorRepository();
  }

  public createActor(actor: NewActor) {
    if (!actor || actor.name.trim().length < 1) return;
    return this.actorRepository.createActor(actor);
  }

  public getActorById(id: string) {
    if (!id) return;
    return this.actorRepository.getActorById(id);
  }

  public deleteActorById(id: string) {
    if (!id) return;
    return this.actorRepository.deleteActorById(id);
  }

  public updateActorById(id: string, name: string, movieId: string) {
    if (!id) return;
    return this.actorRepository.updateActorById(id, name, movieId);
  }
}
