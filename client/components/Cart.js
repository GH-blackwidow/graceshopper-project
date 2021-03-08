import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, editCart } from '../store/Cart';
import CartData from './CartData'

//localStorage- stores data with no expiration data
//sessionsStorage- stores data for one session-data deleted when tab is closed
//storage.getItem()- when passed a key name, will return that key's value, or null if the key does not exist
//.then- returns a promise

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: [], 
            total: 0}
    }

    componentDidMount() {
        this.props.fetchCart()
        let cart = localStorage.getItem('order');
        if(!cart) return;
        getCart(cart).then((products) => {
            let total = 0;
            for (let i=0; i<products.length; i++) {
                total += products[i].price * products[i].quantity
            }
            this.setState({ products, total});
        });
    }

   clearCart = () => {
       localStorage.removeItem('cart')
       this.setState({products: []})
   }

   render() {
       const {products, total} = this.state;

       let edit;
       if (order.isCurrent) {
           edit = <UpdateCart order={order} />
       }
    

       return(
           <div>
               <h2>Your Cart</h2>
               {products.map((product, idx) => 
               <CartData product={product} key={idx} />
               )}
               <div>
                   <button><Checkout /></button>
               </div>
           </div>
       )
   }
}

const mapDispatch = (dispatch) => ({
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    editCart: (userId, newCart) => dispatch(editCart(userId, newCart))
});

export default connect(null, mapDispatch)(Cart)