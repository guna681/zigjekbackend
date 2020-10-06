<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRidetariffTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ridetariff', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('RideTypeId')->nullable();
			$table->integer('RideVechicleTypeId')->nullable();
			$table->integer('Distance')->nullable();
			$table->integer('MinCharges')->nullable();
			$table->integer('MaxCharges')->nullable();
			$table->integer('CountryId')->nullable();
			$table->integer('LanguageId')->nullable();
			$table->timestamp('CreateAt')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->timestamp('UpdateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ridetariff');
	}

}
