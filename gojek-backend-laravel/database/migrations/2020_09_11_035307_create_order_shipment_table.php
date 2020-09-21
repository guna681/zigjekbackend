<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderShipmentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_shipment', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('orderId')->unsigned();
			$table->integer('deliveryStaffId')->unsigned();
			$table->string('orderStatus');
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
		Schema::drop('order_shipment');
	}

}
