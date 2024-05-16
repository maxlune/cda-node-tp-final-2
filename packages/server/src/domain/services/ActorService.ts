import { ActorRepository } from "../../infrastructure/repositories/ActorRepository";
import { NewActor } from "../entities/Actor";

export class ActorService {
  private actorRepository: ActorRepository;

  constructor() {
    this.actorRepository = new ActorRepository();
  }

  /**
   * Crée un nouvel acteur.
   * @param actor - Les données du nouvel acteur à créer.
   * @returns L'acteur créé.
   */
  public createActor(actor: NewActor) {
    if (!actor || actor.name.trim().length < 1) return;
    return this.actorRepository.createActor(actor);
  }

  /**
   * Récupère un acteur par son identifiant.
   * @param id - L'identifiant de l'acteur à récupérer.
   * @returns L'acteur correspondant à l'identifiant spécifié, ou undefined si non trouvé.
   */
  public getActorById(id: string) {
    if (!id) return;
    return this.actorRepository.getActorById(id);
  }

  /**
   * Supprime un acteur par son identifiant.
   * @param id - L'identifiant de l'acteur à supprimer.
   * @returns True si l'acteur a été supprimé avec succès, sinon false.
   */
  public deleteActorById(id: string) {
    if (!id) return;
    return this.actorRepository.deleteActorById(id);
  }

  /**
   * Met à jour les informations d'un acteur par son identifiant.
   * @param id - L'identifiant de l'acteur à mettre à jour.
   * @param name - Le nouveau nom de l'acteur.
   * @param movieId - Le nouvel identifiant du film auquel l'acteur est associé.
   * @returns True si la mise à jour a réussi, sinon false.
   */
  public updateActorById(id: string, name: string, movieId: string) {
    if (!id) return;
    return this.actorRepository.updateActorById(id, name, movieId);
  }
}
