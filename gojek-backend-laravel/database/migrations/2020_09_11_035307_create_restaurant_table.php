<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRestaurantTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('restaurant', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name')->nullable();
			$table->string('email')->nullable();
			$table->text('password', 65535)->nullable();
			$table->string('image')->nullable();
			$table->string('tag')->nullable();
			$table->boolean('isPureVeg')->nullable();
			$table->boolean('isOfferAvailable')->nullable();
			$table->string('costForTwo')->nullable();
			$table->boolean('isExculsive')->nullable();
			$table->boolean('isFavourite')->nullable();
			$table->boolean('isPromoted')->nullable();
			$table->boolean('existLogin')->default(0);
			$table->boolean('keywords')->nullable();
			$table->timestamps();
			$table->integer('averageRating')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('restaurant');
	}

}
