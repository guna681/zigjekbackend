<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDishesCustomisationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dishes_customisation', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name');
			$table->float('price', 10);
			$table->string('description')->default('no description');
			$table->integer('isVeg');
			$table->integer('dishId')->unsigned()->index('dishes_customisation_dishid_index');
			$table->integer('customisationCategoryId')->unsigned()->index('dishes_customisation_customisationcategoryid_index');
			$table->boolean('selected');
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
		Schema::drop('dishes_customisation');
	}

}
