
import ProductList from './components/ProductList';
import SerchSort from './components/SerchSort'
import ShoppingCart from './components/ShoppingCart';
import useShoppingCartIsOpen from './store/useShoppingCartIsOpen';
import useSearchProd from './store/useSearchProd'

function App() {
    const { searchProd } = useSearchProd()
    const { isOpen, Close }  = useShoppingCartIsOpen();
    
    return (
        <>
            <SerchSort/>
            <ProductList products={searchProd} />
            <ShoppingCart isOpen={isOpen} onClose={()=>{ Close() }}/>
        </>

    );
}

export default App;