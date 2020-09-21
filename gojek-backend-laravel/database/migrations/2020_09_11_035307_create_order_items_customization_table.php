<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrderItemsCustomizationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('order_items_customization', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('orderItemId')->unsigned();
			$table->integer('dishCustomisationId');
			$table->string('dishCustomisationName');
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
		Schema::drop('order_items_customization');
	}

}
