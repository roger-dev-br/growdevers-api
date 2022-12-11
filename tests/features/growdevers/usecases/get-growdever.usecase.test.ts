import {
    DatabaseConnection,
    RedisConnection,
} from "../../../../src/main/database";
import { GetGrowdeverUseCase } from "../../../../src/app/features/growdever/usecases/get-growdever.usecase";
import { GrowdeverRepository } from "../../../../src/app/features/growdever/repositories/growdever.repository";

describe("Get growdever usecase tests", () => {
    beforeAll(async () => {
        await DatabaseConnection.connect();
        await RedisConnection.connect();
    });

    afterAll(async () => {
        await DatabaseConnection.destroy();
        RedisConnection.destroy();
    });

    const makeSut = () => {
        const usecase = new GetGrowdeverUseCase(new GrowdeverRepository());
        return usecase;
    };

    test("should return null if growdever does not exist", async () => {
        const sut = makeSut();
        const result = await sut.execute("invalid-id");

        expect(result).toBeNull();
    });

    test("should return a valid json data if growdever exists", async () => {
        const sut = makeSut();
        const result = await sut.execute(
            "157205d4-b14e-49b5-842d-02261ddead18"
        );

        expect(result).not.toBeNull();
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("cpf");
        expect(result!.id).toEqual("157205d4-b14e-49b5-842d-02261ddead18");
    });
});
