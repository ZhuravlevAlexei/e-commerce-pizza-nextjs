import { Suspense } from 'react';
import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
  Stories,
} from '@/shared/components/shared';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar
        categories={categories.filter(category => category.products.length > 0)}
      />

      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* фильтрация */}
          {/* <div className="min-w-[250px]"> */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          {/* список товаров */}
          <div className="flex flex-col gap-16">
            {categories.map(
              category =>
                category.products.length > 0 && (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                )
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

// <ProductsGroupList
//   title="Пиццы"
//   categoryId={1}
//   items={[
//     {
//       id: 1,
//       name: 'Четыре сезона',
//       imageUrl:
//         '/pizza/4-seasons-11EE7D611ADF5AAD898B8B651186E023.avif',
//       items: [{ price: 449 }],
//     },
//     {
//       id: 2,
//       name: 'Четыре сезона',
//       imageUrl:
//         '/pizza/4-seasons-11EE7D611ADF5AAD898B8B651186E023.avif',
//       items: [{ price: 449 }],
//     },
//     {
//       id: 3,
//       name: 'Четыре сезона',
//       imageUrl:
//         '/pizza/4-seasons-11EE7D611ADF5AAD898B8B651186E023.avif',
//       items: [{ price: 449 }],
//     },
//     {
//       id: 4,
//       name: 'Четыре сезона',
//       imageUrl:
//         '/pizza/4-seasons-11EE7D611ADF5AAD898B8B651186E023.avif',
//       items: [{ price: 449 }],
//     },
//     {
//       id: 5,
//       name: 'Четыре сезона',
//       imageUrl:
//         '/pizza/4-seasons-11EE7D611ADF5AAD898B8B651186E023.avif',
//       items: [{ price: 449 }],
//     },
//   ]}
// />
// <ProductsGroupList
//   title="Комбо"
//   categoryId={2}
//   items={[
//     {
//       id: 1,
//       name: 'Четыре сезона',
//       imageUrl:
//         '/pizza/4-seasons-11EE7D611ADF5AAD898B8B651186E023.avif',
//       items: [{ price: 449 }],
//     },
//     {
//       id: 2,
//       name: 'Бургер-пицца',
//       imageUrl:
//         '/pizza/burger-pizza-11EE7D61698827EE9B8DB6D0AEC53410.avif',
//       items: [{ price: 449 }],
//     },
//     {
//       id: 3,
//       name: 'Четыре сезона',
//       imageUrl:
//         '/pizza/4-seasons-11EE7D611ADF5AAD898B8B651186E023.avif',
//       items: [{ price: 449 }],
//     },
//     {
//       id: 4,
//       name: 'Четыре сезона',
//       imageUrl:
//         '/pizza/4-seasons-11EE7D611ADF5AAD898B8B651186E023.avif',
//       items: [{ price: 449 }],
//     },
//     {
//       id: 5,
//       name: 'Четыре сезона',
//       imageUrl:
//         '/pizza/4-seasons-11EE7D611ADF5AAD898B8B651186E023.avif',
//       items: [{ price: 449 }],
//     },
//   ]}
// />
