import HeaderComponent from "@/components/Header/HeaderComponent";
import ProductsCartFormComponent from "@/components/ProductsCartForm/ProductsCartFormComponent";
import ProductCartListComponent from "@/components/ProductsCartList/ProductsCartListComponent";

const ProductsCartPage = () => {
  return (
    <div className="p-10 flex flex-col gap-4">
      <HeaderComponent />
      <div className="flex flex-col gap-4 items-center">
        <ProductsCartFormComponent />
        <ProductCartListComponent />
      </div>
      {/* <a href="https://www.flaticon.com/free-icons/mole" title="mole icons">
        Mole icons created by Freepik - Flaticon
      </a> */}
    </div>
  );
};

export default ProductsCartPage;
