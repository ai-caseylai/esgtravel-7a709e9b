<!DOCTYPE html>  
<html>  
<body>  
  
<button id="checkout-button">Checkout</button>  
  
<script src="https://js.stripe.com/v3/"></script>  
  
<script>  
var stripe = Stripe('pk_test_51P8JxFKoT0FBRG3bykjICxUsdmnmCHUr7XpJ4bLMrWqPdglj4emfwiOV5pjenJH7FvOLsmu0a9oY9LIy91tFpPsR00qFp3KuCI'); // replace with your publishable key  
  
var checkoutButton = document.getElementById('checkout-button');  
  
checkoutButton.addEventListener('click', function() {  
  fetch('/create-checkout-session', {  
    method: 'POST',  
  })  
  .then(function(response) {  
    return response.json();  
  })  
  .then(function(session) {  
    return stripe.redirectToCheckout({ sessionId: session.id });  
  })  
  .then(function(result) {  
    if (result.error) {  
      alert(result.error.message);  
    }  
  })  
  .catch(function(error) {  
    console.error('Error:', error);  
  });  
});  
</script>  
  
</body>  
</html>  