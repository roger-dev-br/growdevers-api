import { UpdateGrowdeverUseCase } from "./../usecases/update-growdever.usecase";
import { CreateGrowdeverUseCase } from "./../usecases/create-growdever.usecase";
import { GetGrowdeverUseCase } from "./../usecases/get-growdever.usecase";
import { Request, Response } from "express";
import { GrowdeverRepository } from "../repositories/growdever.repository";
import { ListGrowdeversUseCase } from "../usecases/list-growdevers.usecase";

export class GrowdeverController {
    public async list(req: Request, res: Response) {
        try {
            const usecase = new ListGrowdeversUseCase(new GrowdeverRepository());
            const result = await usecase.execute();

            return res.status(200).send({
                ok: true,
                message: "Growdevers successfully listed",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usecase = new GetGrowdeverUseCase(new GrowdeverRepository());
            const result = await usecase.execute(id);

            if (!result) {
                return res.status(404).send({
                    ok: false,
                    message: "Deu ruim! O Growdever não existe",
                });
            }

            return res.status(200).send({
                ok: true,
                message: "Growdever successfully obtained",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { nome, cpf, idade, skills, endereco } = req.body;

            if (!nome) {
                return res.status(400).send({
                    ok: false,
                    message: "Nome not provided",
                });
            }

            if (!idade) {
                return res.status(400).send({
                    ok: false,
                    message: "Idade not provided",
                });
            }

            if (!cpf) {
                return res.status(400).send({
                    ok: false,
                    message: "CPF not provided",
                });
            }

            if (endereco) {
                if (!endereco.rua) {
                    return res.status(400).send({
                        ok: false,
                        message: "endereco.rua not provided",
                    });
                }

                if (!endereco.cidade) {
                    return res.status(400).send({
                        ok: false,
                        message: "endereco.cidade not provided",
                    });
                }

                if (!endereco.uf) {
                    return res.status(400).send({
                        ok: false,
                        message: "endereco.uf not provided",
                    });
                }
            }

            const usecase = new CreateGrowdeverUseCase(new GrowdeverRepository());
            const result = await usecase.execute({
                nome,
                cpf,
                idade,
                skills,
                endereco,
            });

            return res.status(201).send({
                ok: true,
                message: "Growdever successfully created",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, idade } = req.body;

            // Verificar se os dados foram informados

            const usecase = new UpdateGrowdeverUseCase(new GrowdeverRepository());
            const result = await usecase.execute({ id, nome, idade });

            if (!result) {
                return res.status(404).send({
                    ok: false,
                    message: "Ng aruá!",
                });
            }

            return res.status(200).send({
                ok: true,
                message: "Growdever atualizado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // to-do:
    //  - delete
    //  - refatorar getByCpf
}
