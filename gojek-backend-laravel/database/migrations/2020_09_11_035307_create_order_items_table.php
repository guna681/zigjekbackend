<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_items', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('orderId')->unsigned();
			$table->integer('dishId');
			$table->string('dishName');
			$table->integer('quantity');
			$table->string('isVeg');
			$table->float('price');
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
		Schema::drop('order_items');
	}

}
