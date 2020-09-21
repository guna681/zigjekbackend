<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToOutletsOfferbannersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('outlets_offerbanners', function(Blueprint $table)
		{
			$table->foreign('outletId')->references('id')->on('outlets')->onUpdate('RESTRICT')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('outlets_offerbanners', function(Blueprint $table)
		{
			$table->dropForeign('outlets_offerbanners_outletid_foreign');
		});
	}

}
