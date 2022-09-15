import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "items"`;
});

describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async () => {
    const item = {
      title: "meu titulo",
      url: "http://minhaurl.com",
      description:"minha description",
      amount:50
    };
    const result = await supertest(app).post("/items").send(item);
    const status = result.status;
    expect(status).toBe(201);
  });

  it('Deve retornar 409, ao tentar cadastrar um item que exista', async () => {
    const item = {
      title: "meu titulo2",
      url: "http://minhaurl.com2",
      description:"minha description2",
      amount:500
    };
    await supertest(app).post("/items").send(item);
    const result = await supertest(app).post("/items").send(item);

    expect(result.status).toEqual(409);
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array', async () => {
    
    const result = await supertest(app).get(`/items`).send();

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe('Testa GET /items/:id ', () => {
  it.todo('Deve retornar status 200 e um objeto igual a o item cadastrado');
  it.todo('Deve retornar status 404 caso não exista um item com esse id');
});
