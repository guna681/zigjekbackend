module.exports = {
  'up': `INSERT INTO EmailSetting (templateName, template, Token , key , status , default, CreateAt, UpdateAt) VALUES
        ('Default', '<!-- meta --><meta charset="UTF-8"><meta name="content" content="width=device-width, initial-scale=1">
<p> </p>

<div style="height:auto; width:100%">
<div style="float:left; height:auto; margin-bottom:38px; text-align:center; width:100%">
<div style="float:left; margin-top:17px; text-align:end; width:48%"><img src="http://139.59.70.80/foodapp/public/images/logo.png" style="height:50px; margin-right:30px; width:50px" /></div>

<div style="color:#000000; float:left; font-size:31px; margin-top:28px; text-align:initial; width:50%">Eatoo</div>
</div>

<hr />
<div style="margin-top:58px; text-align:center">
<h3>THANK YOU FOR SIGN UP EATOO</h3>

<p>Dear ##userName##,</p>

<p>Hope we are having a great time with Eatoo.</p>

<p>To Complete your account verification.</p>

<p>Thank You.</p>
</div>
</div>', '##userName##', 'signup', '1', '1', '2017-10-30 18:28:08', '2017-10-30 18:28:08'),
('Default', '<!-- meta --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><!-- css -->
<style type="text/css">/* @media only screen and (max-width:768px){
.order-list-address{
       overflow-x:auto; 
       width: 100%;
   }
   .third-order{
    width: 187% !important;
}
} */
</style>
<div style="height:auto; margin-bottom:0px; margin-left:0px; margin-right:0px; margin-top:0px; width:90%">
<div style="color:#e66b00; margin-bottom:4px; margin-left:4px; margin-right:4px; margin-top:4px; text-align:center"><img src="http://139.59.70.80/foodapp/public/images/logo.png" style="width:6%" /></div>

<h2 style="margin-left:4px; margin-right:4px; text-align:center"><span style="color:#f1c40f">Eatoo Delivery Order Invoice</span></h2>

<p style="margin-left:0px; margin-right:0px; text-align:left">Hi ##userName##,<br />
Thanks for using Eatoo Delivery! Your order has been delivered.<br />
Looking forward to serving you again.</p>

<div style="height:auto; margin-bottom:0px; margin-left:0px; margin-right:0px; margin-top:0px; width:80%">
<table>
	<tbody>
		<tr>
			<td>
			<div style="border:1px; float:left; line-height:27px; margin-bottom:28px">
			<h3 style="margin-left:4px; margin-right:4px">Picked up from</h3>

			<p>##outletName##<br />
			##outletAddress##</p>

			<p> </p>
			</div>
			</td>
			<td>
			<div style="border:1px; float:left; line-height:27px; margin-bottom:28px">
			<h3 style="margin-left:4px; margin-right:4px">Delivered to</h3>

			<p>##userName##<br />
			##userAddress##</p>
			</div>
			</td>
			<td>
			<div style="border:1px; float:left; line-height:27px; margin-bottom:28px">
			<h3 style="margin-left:4px; margin-right:4px">Order Details</h3>

			<p>OrderId : ##orderRefferenceId##<br />
			Total Item : ##totalItems##<br />
			Net Amount : ##netAmount##</p>
			</div>
			</td>
		</tr>
	</tbody>
</table>

<p> </p>

<div class="order-list-address">##orderSummary##</div>
</div>
</div>', '##userName##', 'order', '1', '0', '2017-10-30 18:28:08', '2017-10-30 18:28:08');`,
  'down': `DELETE FROM EmailSetting`
}
