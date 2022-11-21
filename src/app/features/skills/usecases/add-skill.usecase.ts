import { GrowdeverRepository } from "../../growdever/repositories/growdever.repository";

interface AddSkillDTO {
    id: string;
    skill: string;
}

export class AddSkillUseCase {
    constructor(private repository: GrowdeverRepository) {}

    public async execute(data: AddSkillDTO) {
        const result = await this.repository.update({
            id: data.id,
            skills: [data.skill],
        });

        return result?.toJson();
    }
}
