<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOutletsOfferbannersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('outlets_offerbanners', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('outletId')->unsigned()->index('outlets_offerbanners_outletid_foreign');
			$table->string('bannerImages');
			$table->integer('status');
			$table->softDeletes();
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
		Schema::drop('outlets_offerbanners');
	}

}
