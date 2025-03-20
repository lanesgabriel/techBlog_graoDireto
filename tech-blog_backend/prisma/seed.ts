import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  // Lê o arquivo JSON
  const data = JSON.parse(
    readFileSync(join(__dirname, '../src/assets/articles.json'), 'utf-8'),
  );

  // Cria os artigos
  for (const article of data) {
    await prisma.article.upsert({
      where: { id: article.id },
      update: {},
      create: {
        title: article.title,
        content: article.content,
        author: {
          connectOrCreate: {
            where: { email: `${article.author.toLowerCase()}@example.com` },
            create: {
              name: article.author,
              email: `${article.author.toLowerCase()}@example.com`,
            },
          },
        },
        tags: [article.tag1, article.tag2, article.tag3].filter(Boolean).join(', '),
      },
    });
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });