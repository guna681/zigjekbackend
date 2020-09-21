<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToDishesCustomisationTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('dishes_customisation', function(Blueprint $table)
		{
			$table->foreign('customisationCategoryId')->references('id')->on('dishes_customisation_categories')->onUpdate('RESTRICT')->onDelete('CASCADE');
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
		Schema::table('dishes_customisation', function(Blueprint $table)
		{
			$table->dropForeign('dishes_customisation_customisationcategoryid_foreign');
			$table->dropForeign('dishes_customisation_dishid_foreign');
		});
	}

}
