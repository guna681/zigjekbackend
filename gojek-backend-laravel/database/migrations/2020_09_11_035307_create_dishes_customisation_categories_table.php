<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDishesCustomisationCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dishes_customisation_categories', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name');
			$table->integer('isMandatory')->default(0);
			$table->integer('dishId')->unsigned()->index('dishes_customisation_categories_dishid_index');
			$table->string('categoriesType');
			$table->integer('categoriesPathId');
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
		Schema::drop('dishes_customisation_categories');
	}

}
