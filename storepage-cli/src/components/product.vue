<template>
  <div class="product">
        <div class="product-image">
            <img v-bind:src="image" alt="productImage">
        </div>

        <div class="product-info">
            <ProductHeader :brand="brand" :name="product" :description="description"/>
            
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p> Shipping: {{ shipping }}</p>
            <h2 @mouseover="hover = true" 
                @mouseleave="hover = false"
                :style="{textDecoration: hover? 'underline':''}" v-show="onSale">On Sale!</h2>

            <ul>
                <li v-for="(detail, index) in details" :key="index">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)">
            <!-- v-bind:key === :key -->
            </div>

            <button :disabled="!inStock"
                    :class="{disabledButton: !inStock}"
                    v-on:click="handleAddtoCart">Add to cart</button><br/>
            <button :disabled="!cart" 
                    :class="{disabledButton: !cart}"
                    @click="handleRemoveFromCart">Remove from cart</button>
            <!-- v-on:click === @click -->
        </div>
    </div>
</template>

<script>
import ProductHeader from './productHeader';
import greenSock from '../assets/vmSocks-green.jpg'
import blueSock from '../assets/vmSocks-blue.jpg'

export default {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            required: true
        }
    },
    components: {
        ProductHeader
    },
    data(){
        return{
            hover: false,
            brand: "Vue Mastery",
            product: "Socks",
            description: "A pair of something that you put in your feet",
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    vairantId: 0,
                    variantColor: "green",
                    variantImage: greenSock,
                    variantQuantity: 10
                },
                {
                    vairantId: 1,
                    variantColor: "blue",
                    variantImage: blueSock,
                    variantQuantity: 0
                }
            ],
            onSale: true
        }
    },
    methods: {
        handleAddtoCart: function (){
            this.$emit('add-to-cart')
        },
        handleRemoveFromCart: function (){
            this.$emit('remove-from-cart')
        },
        updateProduct: function (index){
            this.selectedVariant = index;
        }
    },
    computed: {
        image(){
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping(){
            if (this.premium)
                return "Free"
            return 2.99
        }
    }
}
</script>

<style>
.product {
    display: flex;
    flex-flow: wrap;
    padding: 1rem;
}

img {
    border: 1px solid #d8d8d8;
    width: 70%;
    margin: 40px;
    box-shadow: 0px .5px 1px #d8d8d8;
}

.product-image {
    width: 80%;
}

.product-image,
.product-info {
    margin-top: 10px;
    width: 50%;
}

.color-box {
    width: 40px;
    height: 40px;
    margin-top: 5px;
}

button {
    margin-top: 30px;
    border: none;
    background-color: #1E95EA;
    color: white;
    height: 40px;
    width: 100px;
    font-size: 14px;
} 

.disabledButton {
    background-color: #d8d8d8;
}
</style>