<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCartTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cart', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('userId')->unsigned()->nullable();
			$table->string('udId');
			$table->integer('restaurantId')->unsigned()->nullable();
			$table->integer('outletId')->unsigned();
			$table->integer('dishId')->unsigned();
			$table->text('customisationId', 65535)->nullable();
			$table->float('itemPrice', 10)->nullable();
			$table->integer('quantity');
			$table->string('uuId')->nullable();
			$table->string('orderId')->nullable()->default('0');
			$table->integer('deliveryaddressId')->nullable();
			$table->string('couponName')->nullable()->default(' ');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('cart');
	}

}
