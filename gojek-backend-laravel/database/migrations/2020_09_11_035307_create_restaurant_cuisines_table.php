<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRestaurantCuisinesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('restaurant_cuisines', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('outletId')->unsigned();
			$table->integer('cuisineId')->unsigned();
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
		Schema::drop('restaurant_cuisines');
	}

}
