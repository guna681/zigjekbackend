<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOutletsOffersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('outlets_offers', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('outletId')->unsigned();
			$table->string('OfferType');
			$table->string('OfferName');
			$table->string('discount');
			$table->date('dateStart');
			$table->date('dateEnd');
			$table->integer('status');
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
		Schema::drop('outlets_offers');
	}

}
