'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);

const article = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const mockData = [
  {
    "id": `rAslgh`,
    "title": `Самый лучший музыкальный альбом этого года`, "announce": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    "fullText": `Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Программировать не настолько сложно, как об этом говорят.`, "createdDate": `2021-09-26T15:52:01.739Z`,
    "сategory": [`Без рамки`, `IT`],
    "comments": [
      {
        "id": `leo8AX`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Плюсую, но слишком много буквы! Планируете записать видео на эту тему?`
      }
    ]
  },
  {
    "id": `6BdTlE`,
    "title": `Как собрать камни бесконечности`,
    "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    "fullText": `Достичь успеха помогут ежедневные повторения. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Он написал больше 30 хитов. Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Из под его пера вышло 8 платиновых альбомов.`,
    "createdDate": `2021-10-11T11:37:58.787Z`,
    "сategory": [`Разное`, `Кино`],
    "comments": [
      {
        "id": `bgs027`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`
      },
      {
        "id": `xcItF-`,
        "text": `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  },
  {
    "id": `8ZGQBF`,
    "title": `Учим HTML и CSS`,
    "announce": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "fullText": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Ёлки — это не просто красивое дерево. Это прочная древесина. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Из под его пера вышло 8 платиновых альбомов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    "createdDate": `2021-09-27T15:41:51.062Z`,
    "сategory": [`Музыка`],
    "comments": [
      {
        "id": `RJVYwj`,
        "text": `Это где ж такие красоты? Мне кажется или я уже читал это?`
      },
      {
        "id": `L2Gnse`,
        "text": `Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `FgluEd`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то? Это где ж такие красоты?`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new DataService(cloneData), new CommentService(cloneData));
  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 3 articles`, () => expect(response.body.length).toBe(3));
  test(`First article's id equals "rAslgh"`, () => expect(response.body[0].id).toBe(`rAslgh`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/6BdTlE`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title is "Как собрать камни бесконечности"`, () => expect(response.body.title).toBe(`Как собрать камни бесконечности`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    category: `Железо`,
    title: `Рок — это протест`,
    announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Золотое сечение — соотношение двух величин, гармоническая пропорция. Программировать не настолько сложно, как об этом говорят. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Он написал больше 30 хитов. Это один из лучших рок-музыкантов. Простые ежедневные упражнения помогут достичь успеха.`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    category: `Железо`,
    title: `Рок — это протест`,
    announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Золотое сечение — соотношение двух величин, гармоническая пропорция. Программировать не настолько сложно, как об этом говорят. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Он написал больше 30 хитов. Это один из лучших рок-музыкантов. Простые ежедневные упражнения помогут достичь успеха.`
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const newArticle = {
    category: `Железо`,
    title: `Рок — это протест`,
    announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Золотое сечение — соотношение двух величин, гармоническая пропорция. Программировать не настолько сложно, как об этом говорят. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Он написал больше 30 хитов. Это один из лучших рок-музыкантов. Простые ежедневные упражнения помогут достичь успеха.`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/8ZGQBF`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article is really changed`, () => request(app)
    .get(`/articles/8ZGQBF`)
    .expect((res) => expect(res.body.title).toBe(`Рок — это протест`))
  );
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    category: `Это`,
    title: `валидный`,
    announce: `объект`,
    fullText: `статьи`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    category: `Невалидная`,
    title: `статья`,
    fullText: `нет поля announce`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/6BdTlE`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(`6BdTlE`));
  test(`Article count is 2 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});


describe(`API returns a list of comments to given article`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/articles/8ZGQBF/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 3 comments`, () => expect(response.body.length).toBe(3));
  test(`First comment's text is "Это где ж такие красоты? Мне кажется или я уже читал это?"`,
      () => expect(response.body[0].text).toBe(`Это где ж такие красоты? Мне кажется или я уже читал это?`));
});


describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этих полей`
  };
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles/8ZGQBF/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Comments count is changed`, () => request(app)
    .get(`/articles/8ZGQBF/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, async () => {
  const app = await createAPI();

  return request(app)
    .post(`/articles/20/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {
  const invalidComment = {};

  const app = await createAPI();

  return request(app)
    .post(`/articles/8ZGQBF/comments`)
    .send(invalidComment)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/8ZGQBF/comments/FgluEd`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Comments count is 2 now`, () => request(app)
    .get(`/articles/8ZGQBF/comments`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to delete non-existent comment`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/articles/8ZGQBF/comments/100`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, async () => {
  const app = await createAPI();

  return request(app)
    .delete(`/articles/20/comments/1`)
    .expect(HttpCode.NOT_FOUND);
});
