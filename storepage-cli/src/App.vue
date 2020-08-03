<template>
  <div>
    <div class="nav-bar"></div>
    <div id="app">
      <div class="cart">
            <p>Cart({{ cart }})</p>
        </div>

      <Product :premium="premium" :cart="cart" @add-to-cart="addToCart" @remove-from-cart="removeFromCart"/>

      <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="(review, index) in reviews" :key="index">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                </li>
            </ul>
      </div>
      <Review @review-submitted="addReview"/>
    </div>
  </div>
</template>

<script>
import Product from './components/product';
import Review from './components/review';

export default {
  name: 'App',
  components: {
    Product,
    Review
  },

  data(){
    return{
      premium: false,
      cart: 0,
      reviews: []
    }
  },
  methods: {
    addToCart: function (){
      this.cart++;
    },
    removeFromCart: function (){
      if (this.cart > 0)
        this.cart--;
    },
    addReview: function(review){
      this.reviews.push(review);
    }
  }
}
</script>

<style>
body {
    font-family: tahoma;
    color:#282828;
    margin: 0px;
}

.nav-bar {
    background: linear-gradient(-90deg, #84CF6A, #16C0B0);
    height: 100px;
    margin-bottom: 15px;
}

.cart {
    margin-right: 25px;
    float: right;
    border: 1px solid #d8d8d8;
    padding: 5px 20px;
}
</style>
