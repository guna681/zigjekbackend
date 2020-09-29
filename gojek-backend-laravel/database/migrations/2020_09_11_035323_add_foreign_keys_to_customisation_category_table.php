<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCustomisationCategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('customisation_category', function(Blueprint $table)
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
		Schema::table('customisation_category', function(Blueprint $table)
		{
			$table->dropForeign('customisation_category_outletid_foreign');
		});
	}

}
