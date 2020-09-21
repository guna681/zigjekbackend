<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToDishesCustomisationCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('dishes_customisation_categories', function(Blueprint $table)
		{
			$table->foreign('dishId')->references('id')->on('dishes')->onUpdate('RESTRICT')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('dishes_customisation_categories', function(Blueprint $table)
		{
			$table->dropForeign('dishes_customisation_categories_dishid_foreign');
		});
	}

}
