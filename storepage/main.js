Vue.component('productHeader', {
    props: {
        brand: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    template: `
    <div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
    </div>
    `,
    computed: {
        title(){
            return this.brand + ' ' + this.name;
        }
    }
})

Vue.component('product', {
    props: {
        premium:{
            type: Boolean,
            required: true
        },
        cart:{
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" alt="productImage">
        </div>

        <div class="product-info">
            <productHeader :brand="brand" :name="product" :description="description"></productHeader>
            
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p> Shipping: {{ shipping }}</p>
            <h2 @mouseover="hover = true" 
                @mouseleave="hover = false"
                :style="{textDecoration: hover? 'underline':''}" v-show="onSale">On Sale!</h2>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
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
    `,
    data (){
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
                    variantImage: "./assets/vmSocks-green.jpg",
                    variantQuantity: 10
                },
                {
                    vairantId: 1,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue.jpg",
                    variantQuantity: 0
                }
            ],
            onSale: true
        }
    },
    methods: {
        handleAddtoCart: function (){
            this.$emit('add-to-cart');
        },
        handleRemoveFromCart: function(){
            this.$emit('remove-from-cart');
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
})

Vue.component('productReview', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please corret the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>

        <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        </p>
            
        <p>
        <input type="submit" value="Submit">  
        </p>    

    </form>
    `,
    data(){
        return{
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            this.errors = [];
            if (this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
            }
            else{
                if (!this.name) this.errors.push("Name required.");
                if (!this.review) this.errors.push("review required.");
                if (!this.rating) this.errors.push("rating required.");
            }
        }
    }
})

new Vue ({
    el: '#app',
    data: {
        premium: false,
        cart: 0,
        reviews: []
    },
    methods: {
        addToCart: function (){
            this.cart++;
        },
        removeFromCart: function(){
            this.cart--;
        },
        addReview: function(review){
            this.reviews.push(review);
        }
    }
})