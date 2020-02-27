var express = require("express");
var cartRoutes = express.Router();
var pool = require("./db");


cartRoutes.post("/api/get/userCartItems", function(req, res, next) {
   console.log("request parsdfadsfadam is:" + req.body.user_id);
    const user_id=req.body.user_id
    const userCart="SELECT p.*, p.id, p.name, p.cost, p.seller, p.description, p.category_id, p.status, p.image FROM table_product p JOIN basket b on p.id=b.product_id where b.user_id ='"+user_id+"'";
    pool.query(userCart, (q_err, q_res) => {
        if (q_err != null) {
            console.log(q_err);
            res.status(401).json(q_err);
        } else {
            console.log(JSON.stringify(q_res, null, 2));
            res.status(200).json(q_res);
        }
    });
});

cartRoutes.post("/api/post/storeCartInfoFromLocalStorage", function(req, res, next) {
    var user_id = req.body.user_id;
    var product_id = req.body.product_id;
    //var product_quantity=req.body.quantity;
    var lastinsert=0;
    console.log(user_id);
    const query5= "SELECT * FROM basket where user_id= '" +
        user_id +
        "'";
    pool.query(query5, (q_err, buyer_query_res) => {
        console.log("Buyer IDDDD:",buyer_query_res.length)
        console.log("Length:",buyer_query_res.length)
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        }

        else if(buyer_query_res.length===0){
            const query1 = "INSERT INTO basket (user_id) VALUES ("+user_id+")";
            pool.query(query1, (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    res.status(401).json(q_err);
                }
                lastinsert=q_res.insertId;
                const query4 = "INSERT INTO purchsed_product (product_id, user_id) VALUES ("+product_id+","+user_id+")";
                pool.query(query4, (q_err, q_res) => {
                    if (q_err) {
                        console.log(q_err);
                        res.status(401).json(q_err);
                    }
                    else{
                        //console.log(JSON.stringify(q_res, null, 2));
                        res.send({
                            code: 200,
                        });
                    }
                });

            });
        }
        else {

            lastinsert=buyer_query_res[0].id;
            const query4 = "INSERT INTO purchsed_product (product_id, user_id) VALUES ("+product_id+","+user_id+")";
            pool.query(query4, (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    res.status(401).json(q_err);
                }
                else{
                    //console.log(JSON.stringify(q_res, null, 2));
                    res.send({
                        code: 200,
                    });
                }
            });

        }

    });
});
cartRoutes.post("/api/post/addtocart", function(req, res){
    var user_id= req.body.user_id;
    var product_id =req.body.product_id;
    var id;
    //var quantity=req.body.quantity;
    console.log("Debug Cart:",req.body);
    if (user_id){
        const query= "SELECT * FROM table_product WHERE id = " +product_id +"";
        pool.query(query, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        }else if(q_res.length>1){
            var sold_date = q_res[0].sold_date;
            if (sold_date)
             return res.status(404).json({ message: "this item is not exist anymore" });
        }

            const query5= "SELECT user_id FROM basket where user_id= '" +
            user_id +
            "'";
            pool.query(query5, (q_err, q_res) => {
                console.log("bkdlfkdslfkdskfld",q_res.length)
            if (q_err) {
                console.log(q_err);
                res.status(401).json(q_err);
            }
            else if(q_res.length<1){

                const query1 = "INSERT INTO basket (user_id) VALUES ("+user_id+")";
                pool.query(query1, (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    res.status(401).json(q_err);
                }

                    //cart_id=q_res.insertId
                });
            }
            else {
                const query2="SELECT id FROM basket WHERE user_id='"+user_id+"'";
                pool.query(query2, (q_err, q_res) => {
                    if (q_err) {
                        res.status(401).json(q_err);
                    }else{

                        cart_id =q_res[0].id;

                        console.log("INSERTED CARTD ID",cart_id)
                        const query5= "SELECT * FROM purchased_product WHERE product_id = " +product_id +" AND id="+id+"";
                        pool.query(query5, (q_err, q_res) => {
                            if (q_err) {
                                console.log(q_err);
                                res.status(401).json(q_err);
                            }else if(q_res.length>1){
                                return res.status(404).json({ message: "this item is already added in cart" });
                            }
                        });
                        const query4 = "INSERT INTO purchased_product (product_id, id) VALUES ("+product_id+","+id+")";
                        pool.query(query4, (q_err, q_res) => {
                            if (q_err) {
                                console.log(q_err);
                                res.status(401).json(q_err);
                            }else{
                                console.log(JSON.stringify(q_res, null, 2));
                                res.send({
                                    code: 200,
                                    success: "product added to cart"
                                });
                            }
                        });
                    }
                });
            }

            });
            console.log("BUYER IDIDID______>",user_id)

        });

    }else{
        return res.status(404).json({ message: "user does not login" });
      }
});


cartRoutes.get("/api/get/getcartitems", function(req, res){
    var cart_id =req.query.cart_id;
    const query= "select name, cost from table_product p INNER JOIN purchased_product pp ON p.id=pp.product_id where pp.id ="+2+"";
    pool.query(query, (q_err, q_res) => {
    if (q_err) {
        console.log(q_err);
        res.status(401).json(q_err);
    }else{
    console.log(JSON.stringify(q_res, null, 2));
      res.status(200).json(q_res);

    }
    });
});

cartRoutes.post("/api/post/deleteitemincart", function(req, res){
    var cart_id;
    var product_id =req.body.product_id;
    console.log("product_id",product_id);
    var user_id= req.body.user_id;
    console.log("UserID",user_id)
    const query2="SELECT id FROM basket where user_id=  "+user_id+"";
    pool.query(query2, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        }
        id=q_res[0].id;
        if (id){
            const  query= "DELETE FROM purchased_product where id = " +id +" AND product_id= "+product_id+"";
            pool.query(query, (q_err, q_res) => {
                console.log("execute")
                if (q_err) {
                    console.log("eeroror")
                    console.log(q_err);
                    res.status(401).json(q_err);
                }else{
                    console.log("success")
                    console.log(JSON.stringify(q_res, null, 2));
                    res.send({
                        code: 200,
                        success: "product deleted from cart"
                    });
                }

            });
        }
        else{
            return res.status(404).json({ message: "user does not login" });
        }

    });
    console.log("cart ID",cart_id)

});

cartRoutes.post("/api/post/checkout", function(req, res){
    var user_id= req.body.id;
    var product_id =req.body.product_id;
    
    const query= "SELECT * FROM `GDSG_schema`.`table_product` WHERE id = '" +id +"'";
        pool.query(query, (q_err, q_res) => {
        if (q_err) {
            console.log(q_err);
            res.status(401).json(q_err);
        }else if(q_res.length>1){
            var sold_date = q_res[0].sold_date;
            if (sold_date)
             return res.status(404).json({ message: "this item is not exist anymore" });
        }else{
            const query1 ="UPDATE purchased_product SET " +
            "user_id='" +
            user_id +
            "'," +
            "sold_date= CURRENT_TIMESTAMP where id= "+product_id+"" ;
            pool.query(query1, (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    res.status(401).json(q_err);
                }else {
                    console.log(JSON.stringify(q_res, null, 2));
                    res.send({
                        code: 200,
                        success: "purchase is done"
                    });
                }
            });
        }

    });

});

cartRoutes.post("/api/post/buy_item", function(req, res){
    var user_id= req.body.userID;
    //console.log("Buyer ID:",user_id);
    const buyQuery="SELECT cart.user_id,purchased_product.product_id,cart_product.cart_id FROM cart join cart_product on cart.id=cart_product.cart_id where cart.buyer_id='"+user_id+"'";
    pool.query(buyQuery, (q_err, q_res) => {
        if (q_err != null) {
            console.log(q_err);
            res.status(401).json(q_err);
        } else {

            q_res.forEach(
                (productInCart,index) => {
                    console.log("buyerID",productInCart.user_id);
                    const query= "SELECT * FROM `GDSG_schema`.`table_product` WHERE id = '" +productInCart.product_id+"'";
                    pool.query(query, (q_err, q_res) => {
                        if (q_err) {
                            console.log(q_err);
                            res.status(401).json(q_err);
                        }else if(q_res.length>1){
                            var sold_date = q_res[0].sold_date;
                            if (sold_date)
                                return res.status(404).json({ message: "this item is not exist anymore" });
                        }else{
                            const query1 ="UPDATE product SET " +
                                "user_id='" +
                                productInCart.user_id +
                                "'," +
                                "sold_date= CURRENT_TIMESTAMP where id= "+productInCart.product_id+"" ;
                            pool.query(query1, (q_err, q_res) => {
                                if (q_err) {
                                    console.log(q_err);
                                    res.status(401).json(q_err);
                                }else {
                                    console.log(JSON.stringify(q_res, null, 2));

                                }
                            });
                        }

                    });
                });

        }
    });
    const  query= "DELETE FROM basket where user_id = " +user_id+"";

    pool.query(query, (q_err, q_res) => {
        console.log("execute")
        if (q_err) {
            console.log("eeroror")
            console.log(q_err);
            res.status(401).json(q_err);
        }else{
            console.log("success")
            console.log(JSON.stringify(q_res, null, 2));
            res.send({
                code: 200,
                success: "purchase is done"
            });
        }

    });

});

module.exports = cartRoutes;