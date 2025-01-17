import { notFound } from 'next/navigation';
import { prisma } from '@/prisma-setup/prisma-client';
import { Container, ProductForm } from '@/shared/components/shared';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
      // вариант от автора 14:41:00 - но что-то у него не срослось (prisma не видит createdAt), а у меня вот видит...???
      // items: {
      //   orderBy: {
      //     createdAt: 'desc',
      //   },
      //   include: {
      //     product: {
      //       include: {
      //         items: true,
      //       },
      //     },
      //   },
      // },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
