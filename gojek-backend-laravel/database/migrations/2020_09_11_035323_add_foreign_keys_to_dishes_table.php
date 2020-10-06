<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToDishesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('dishes', function(Blueprint $table)
		{
			$table->foreign('categoryId')->references('id')->on('outlet_menucategories')->onUpdate('RESTRICT')->onDelete('CASCADE');
			$table->foreign('outletId', 'dishes_restaurantid_foreign')->references('id')->on('outlets')->onUpdate('RESTRICT')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('dishes', function(Blueprint $table)
		{
			$table->dropForeign('dishes_categoryid_foreign');
			$table->dropForeign('dishes_restaurantid_foreign');
		});
	}

}
