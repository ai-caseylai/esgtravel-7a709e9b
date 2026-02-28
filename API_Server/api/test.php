<?php
require 'Stripe/init.php';
//require_once('vendor/autoload.php');  
$sessionid = $_GET['session'];
$stripe = new Stripe\StripeClient("YOUR_STRIPE_SECRET_KEY");

Stripe\Stripe::setApiKey('YOUR_STRIPE_SECRET_KEY');  

/*
try {  
  $customer = Stripe\Customer::create([  
      'name' => 'Devil Tse',  
      'email' => 'deviltse@gmail.com',  
      'description' => 'deviltse@gmail.com',  
  ]);  

  echo 'Customer ID: ' . $customer->id;  

} catch (Stripe\Exception\ApiErrorException $e) {  
  // Handle error  
  echo 'Stripe API error: ' . $e->getMessage();  
} catch (Exception $e) {  
  // Handle error  
  echo 'General error: ' . $e->getMessage();  
}  

  
try {  
    // Create a PaymentIntent:  
    $paymentIntent = Stripe\PaymentIntent::create([  
      'amount' => 1000, // amount in cents  
      'currency' => 'usd',  
      'description' => 'Software development services',  
      'payment_method_types' => ['card'],  
    ]);  
  
    //echo 'Payment Intent ID: ' . $paymentIntent->id;  
  
} catch (Stripe\Exception\ApiErrorException $e) {  
    // Handle error  
    echo 'Stripe API error: ' . $e->getMessage();  
} catch (Exception $e) {  
    // Handle error  
    echo 'General error: ' . $e->getMessage();  
}  
*/
  
/*
// Replace with your checkout session ID  
$checkout_session_id = $sessionid;  
  
// Retrieve the checkout session  
$checkout_session = Stripe\Checkout\Session::retrieve(  
  $checkout_session_id  
);  
  // Retrieve the payment intent ID from the checkout session  
$payment_intent_id = $checkout_session->payment_intent;  
  
// Retrieve the payment intent using the ID  
$payment_intent = Stripe\PaymentIntent::retrieve(  
  $payment_intent_id  
);  
  
// Print the status of the payment  

echo $payment_intent;
echo "<br>";
echo $payment_intent->status;  
echo "<br>";
echo $checkout_session->customer;

// Retrieve session  
$session = \Stripe\Checkout\Session::retrieve($sessionid);  
  
// Retrieve payment intent  
$payment_intent = \Stripe\PaymentIntent::retrieve($payment_intent_id);  
  
// Retrieve customer  
$customer = \Stripe\Customer::retrieve($session->customer);  

/*
$apiurl = "https://api.stripe.com/api.php";
if($payment_intent->status == "succeeded"){
  $apiurl = "https://api.stripe.com/api.php";
  $api_params = array(
    'ActionType' => 'UpdatePaymentStatus',
    'session' => $sessionid,
    'status' => 'succeeded'
  );
  $payload = json_encode($data);  
  
}else{
  $api_params = array(
    'session' => $sessionid,
    'status' => 'failed'
  );
  $payload = json_encode($data);  
}

curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);  
  
//Set the content type to application/json  
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));  
  
//Return response instead of outputting  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
  
//Execute the POST request  
$result = curl_exec($ch);  
  
//Close cURL resource  
curl_close($ch);  */
//echo $paymentIntent->client_secret;
?>


<!DOCTYPE html>  
<html>  
<head>  
    <title>Payment Form</title>  
    <script src="https://js.stripe.com/v3/"></script>  
    <style>  
        .StripeElement {  
            box-sizing: border-box;  
            height: 40px;  
            padding: 10px 12px;  
            border: 1px solid transparent;  
            border-radius: 4px;  
            background-color: white;  
            box-shadow: 0 1px 3px 0 #e6ebf1;  
            -webkit-transition: box-shadow 150ms ease;  
            transition: box-shadow 150ms ease;  
        }  
    </style>  
</head>  
<body>  
    <form action="/charge" method="post" id="payment-form">  
        <div class="form-row">  
            <label for="card-element">  
                Credit or debit card  
            </label>  
            <div id="card-element">  
                <!-- A Stripe Element will be inserted here. -->  
            </div>  
            <!-- Used to display form errors. -->  
            <div id="card-errors" role="alert"></div>  
        </div>  
        <button>Submit Payment</button>  
    </form>  
  
    <script>  
        // Create a Stripe client.  
        var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Your Publishable Key  
  
        // Create an instance of Elements.  
        var elements = stripe.elements();  
  
        // Create an instance of the card Element.  
        var card = elements.create('card');  
  
        // Add an instance of the card Element into the `card-element` <div>.  
        card.mount('#card-element');  
  
        // Handle form submission.  
        var form = document.getElementById('payment-form');  
        form.addEventListener('submit', function(event) {  
            event.preventDefault();  
  
            stripe.createToken(card).then(function(result) {  
                if (result.error) {  
                    // Inform the user if there was an error.  
                    var errorElement = document.getElementById('card-errors');  
                    errorElement.textContent = result.error.message;  
                } else {  
                    // Send the token to your server.  
                    stripeTokenHandler(result.token);  
                }  
            });  
        });  
  
        function stripeTokenHandler(token) {  
            // Insert the token ID into the form so it gets submitted to the server  
            var form = document.getElementById('payment-form');  
            var hiddenInput = document.createElement('input');  
            hiddenInput.setAttribute('type', 'hidden');  
            hiddenInput.setAttribute('name', 'stripeToken');  
            hiddenInput.setAttribute('value', token.id);  
            form.appendChild(hiddenInput);  
  
            // Submit the form  
            form.submit();  
        }  
    </script>  
</body>  
</html>  