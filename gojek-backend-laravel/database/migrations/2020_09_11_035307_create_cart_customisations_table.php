<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCartCustomisationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cart_customisations', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('cartId')->unsigned();
			$table->integer('dishId')->nullable();
			$table->integer('dishCustomisationId')->unsigned();
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
		Schema::drop('cart_customisations');
	}

}
