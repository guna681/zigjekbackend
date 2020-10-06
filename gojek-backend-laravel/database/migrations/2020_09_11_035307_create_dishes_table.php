<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDishesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dishes', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('outletId')->unsigned()->index('dishes_restaurantid_foreign');
			$table->string('name');
			$table->string('image')->nullable();
			$table->string('tag')->default('2');
			$table->float('price', 10);
			$table->float('slashedPrice', 10, 3);
			$table->integer('quantity');
			$table->string('description')->default('no description');
			$table->boolean('isRecommended')->default(0);
			$table->integer('categoryId')->unsigned()->index('dishes_categoryid_foreign');
			$table->integer('isVeg');
			$table->time('showFromTime');
			$table->time('showToTime');
			$table->boolean('status')->default(0);
			$table->softDeletes();
			$table->timestamps();
			$table->boolean('isCustomisation')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('dishes');
	}

}
