<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOutletMenucategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('outlet_menucategories', function(Blueprint $table)
		{
			$table->foreign('outletId')->references('id')->on('outlets')->onUpdate('RESTRICT')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('outlet_menucategories', function(Blueprint $table)
		{
			$table->dropForeign('outlet_menucategories_outletid_foreign');
		});
	}

}
