<?php
require 'Stripe/init.php';
$sessionid = $_GET['session'];
$stripe = new Stripe\StripeClient("YOUR_STRIPE_SECRET_KEY");


//header('Content-Type: application/json');  
  
$checkout_session = Stripe\Checkout\Session::create([  
  'payment_method_types' => ['card'],  
  'line_items' => [[  
    'price_data' => [  
      'currency' => 'usd',  
      'product_data' => [  
        'name' => 'T-shirt',  
      ],  
      'unit_amount' => 200,  
    ],  
    'quantity' => 1,  
  ]],  
  'mode' => 'payment',  
  'success_url' => 'https://www.starsdg.com/?thankyou?session_id={CHECKOUT_SESSION_ID}',  
  'cancel_url' => 'https://www.starsdg.com/cancel',  
]);  
  

echo json_encode(['id' => $checkout_session->id]);  
// Retrieve session  

$checkout_session = Stripe\Checkout\Session::retrieve(  
    $checkout_session->id
  );  

echo 'Checkout Session ID: ' . $checkout_session->id;
  
?>
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