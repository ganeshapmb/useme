import ProductOne from "@/components/Products/ProductOne";

// export default async function Page(params:any) {
//     const id:any = params.slug;
//     return (
//         <>
//         <ProductOne productId={params.slug} />
//         </>
//     )
// }

export default async function Page({ params }: { params: { slug: string } }) {
    return <>
        <ProductOne productId={params.slug} />
    </>
  }