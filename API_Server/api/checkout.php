<?php
require '/Stripe/init.php';

$stripe_secret_key = "pk_test_51P8JxFKoT0FBRG3bykjICxUsdmnmCHUr7XpJ4bLMrWqPdglj4emfwiOV5pjenJH7FvOLsmu0a9oY9LIy91tFpPsR00qFp3KuCI";


// $lineItems = [];
// $lineItems[0] = [
//     "quantity" => 1,
//     "price"=> "price_1PLcwvKoT0FBRG3bNOn0hCpI",
// ];

// switch($_GET('extrahelp')){
//     case 1:
//         $lineItems[1] = [
//             "quantity" => 1,
//             "price"=> "price_1PLcxTKoT0FBRG3bfWcPLwRB",
//         ];
//         break;
//     case 5:
//         $lineItems[1] = [
//             "quantity" => 1,
//             "price"=> "price_1PLcy7KoT0FBRG3baIrixerK",
//         ];
//         break;
//     case 10:
//         $lineItems[1] = [
//             "quantity" => 1,
//             "price"=> "price_1PLcyLKoT0FBRG3bSvPfWAaZ",
//         ];
//         break;
//     }

\Stripe\Stripe::setApiKey($stripe_secret_key);
$checkout_session = \Stripe\Checkout\Session::create([
    "mode" => "payment",
    "success_url" => "https://www.starsdg.com/thankyou",
    "cancel_url" => "https://www.starsdg.com/orderfailed",
    "locale" => "auto",
    "line_items" =>  [
        [
            "quantity" => 1,
            "price_data" => [
                "currency" => "usd",
                "unit_amount" => 2000,
                "product_data" => [
                    "name" => "T-shirt"
                ]
            ]
        ],
        [
            "quantity" => 2,
            "price_data" => [
                "currency" => "usd",
                "unit_amount" => 700,
                "product_data" => [
                    "name" => "Hat"
                ]
            ]
        ]        
    ]
]);

http_response_code(303);
header("Location: " . $checkout_session->url);

?>