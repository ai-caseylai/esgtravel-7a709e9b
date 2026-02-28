
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<html>
    <head><title>Login Form</title></head>
    <body>

    <script setup>
import { ref } from 'vue'

// component logic
// declare some reactive state here.
</script>

<template>
  <h1>Make me dynamic!</h1>
</template>

        <form action="api/GetOTP" method="post">
            areacode: <input type="text" name="areacode" value=""></inpput><br>
            mobile: <input type="text" name="mobile" value=""></inpput><br>
            email: <input type="text" name="email" value=""></inpput><br>
            <input type="radio" name="method" value="sms">sms</input>
            
            <input type="radio" name="method" value="email">email</input><br>
            <input type="submit" name="submit" value="submit"></input>
        </form>
        
        <br>
        <form action="api/OrderBadge" method="post">
            badge id: <input type="text" name="badge_id" value=""></inpput><br>
            price: <input type="text" name="price" value=""></inpput><br>
            mark: <input type="text" name="mark" value=""></inpput><br>
            payment: <input type="text" name="payment_method" value=""></inpput><br>
            <input type="submit" name="submit" value="submit">
        </form>
        <br>
        <form action="api/api.php" method="post">
            badge id: <input type="text" name="badge_id" value="1"></inpput><br>
            price: <input type="text" name="mark_id" value="0"></inpput><br>
            mark: <input type="text" name="user_id" value="0"></inpput><br>
            <input type="text" name="ActionType" value="AddRank"></inpput><br>
            <input type="submit" name="submit" value="submit">
        </form>
        <?php
        
            session_start();
            if(isset($_SESSION["username"]))
            {
                echo $_SESSION["username"];
            }
			if(isset($_GET['loginstatus']))
			{
            	$status = $_GET['loginstatus'];
            	echo $status;
			}
        ?>
    </body>
</html>
